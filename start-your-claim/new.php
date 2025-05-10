<?php

include 'mailer/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "mailer/PHPMailer.php";
require_once "mailer/SMTP.php";
require_once "mailer/Exception.php";

function sendMail($email, $subject, $message)
{
    $mail = new PHPMailer();

    // SMTP Settings
    $mail->isSMTP();
    $mail->Host = "server52.web-hosting.com"; // Replace with your mail server
    $mail->SMTPAuth = true;
    $mail->Username = "support@recoveryquest.online"; // Your cPanel email
    $mail->Password = '@recoveryquest'; // Your cPanel email password
    $mail->Port = 465; // Typically 465 for SSL
    $mail->SMTPSecure = "ssl"; // Use 'tls' for 587

    // Email Settings
    $mail->isHTML(true);
    $mail->setFrom("support@recoveryquest.online", "Wealth Recovery Solicitors"); // Sender details
    $mail->addAddress($email); // Recipient email
    $mail->AddReplyTo("support@recoveryquest.online", "Wealth Recovery Solicitors"); // Reply-to email
    $mail->Subject = $subject;
    $mail->MsgHTML($message);

    // Error handling
    if (!$mail->Send()) {
        return 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        return true;
    }
}

if (isset($_POST['submit'])) {
    // Get form data
    $amount = $_POST['amount'];
    $payment_method = $_POST['payment_method'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $heard_of_us = $_POST['heard_of_us'];

    // User email details
    $subject = "Claim Submission";
    $body = "
        <table>
            <p>Your refund request has been successfully received. Our team is currently processing it, and we’ll notify you via email if any additional information is required. Thank you for your patience.</p>
        </table>";
    $send = sendMail($email, $subject, $body);

    if ($send === true) {
        // Admin email details
        $subject = "New Claim Submitted";
        $body = "
            <table>
                <h2>New Claim Submitted</h2>
                <p><strong>Amount Lost:</strong> $amount</p>
                <p><strong>Payment Method:</strong> $payment_method</p>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Phone Number:</strong> $phone</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Heard About Us:</strong> $heard_of_us</p>
            </table>";

        //admin email to receive notification where there is a new claim request
        $uemail = 'support@recoveryquest.online';
        $sends = sendMail($uemail, $subject, $body);

        if ($sends === true) {
            echo "<script> window.location.href = 'proccess.php'; </script>";
        } else {
            // Handle admin email error
            echo 'Error sending admin notification: ' . $sends;
        }
    } else {
        // Handle user email error
        echo 'Error sending user email: ' . $send;
    }
}
