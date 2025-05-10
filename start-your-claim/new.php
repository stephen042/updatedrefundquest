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
    $body = '
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 30px;">
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <img src="https://recoveryquest.online/app/uploads/2024/06/wrs_logo.png" alt="Company Logo" width="150" style="display: block;">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2 style="color: #333333;">Refund Request Received</h2>
                                <p style="color: #555555; font-size: 15px; line-height: 1.6;">
                                    Dear Customer,<br><br>
                                    Your refund request has been successfully received. Our team is currently reviewing the details.
                                    You will be notified via email if any further information is required.<br><br>
                                    Thank you for your patience.<br><br>
                                    Best regards,<br>
                                    <strong>Wealth Recovery Solicitors</strong>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding-top: 20px; font-size: 12px; color: #999999;">
                                &copy; ' . date("Y") . ' Wealth Recovery Solicitors. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>';

    $send = sendMail($email, $subject, $body);

    if ($send === true) {
        // Admin email details
        $subject = "New Claim Submitted";
        $body = '
            <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 30px;">
                            <tr>
                                <td align="center" style="padding-bottom: 20px;">
                                    <img src="https://recoveryquest.online/app/uploads/2024/06/wrs_logo.png" alt="Company Logo" width="150" style="display: block;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2 style="color: #333333;">New Claim Submission</h2>
                                    <table width="100%" style="color: #555555; font-size: 15px; line-height: 1.6;">
                                        <tr><td><strong>Amount Lost:</strong> ' . $amount . '</td></tr>
                                        <tr><td><strong>How was the money lost?</strong> ' . $payment_method . '</td></tr>
                                        <tr><td><strong>Name:</strong> ' . $name . '</td></tr>
                                        <tr><td><strong>Phone Number:</strong> ' . $phone . '</td></tr>
                                        <tr><td><strong>Email:</strong> ' . $email . '</td></tr>
                                        <tr><td><strong>Heard About Us:</strong> ' . $heard_of_us . '</td></tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-top: 20px; font-size: 12px; color: #999999;">
                                    &copy; ' . date("Y") . ' Wealth Recovery Solicitors. All rights reserved.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>';


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
