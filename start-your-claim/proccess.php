<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--<meta http-equiv="refresh" content="5;url=">-->
    <style>
        /* Your existing styles remain unchanged */
        :root {
            --background: #ffffff;
            --foreground: #1e1e1e;
            --card: #ffffff;
            --card-foreground: #1e1e1e;
            --popover: #ffffff;
            --popover-foreground: #1e1e1e;
            --primary: #1e1e1e;
            --primary-foreground: #f5f5f5;
            --secondary: #e0e0e0;
            --secondary-foreground: #1e1e1e;
            --muted: #e0e0e0;
            --muted-foreground: #616161;
            --accent: #e0e0e0;
            --accent-foreground: #1e1e1e;
            --destructive: #ffca80;
            --destructive-foreground: #ffffff;
            --border: #e0e0e0;
            --input: #e0e0e0;
            --ring: #1e1e1e;
            --radius: 0.5rem;
        }

        .dark {
            --background: #1e1e1e;
            --foreground: #f5f5f5;
            --card: #1e1e1e;
            --card-foreground: #f5f5f5;
            --popover: #1e1e1e;
            --popover-foreground: #f5f5f5;
            --primary: #f5f5f5;
            --primary-foreground: #1e1e1e;
            --secondary: #2d2d2d;
            --secondary-foreground: #f5f5f5;
            --muted: #2d2d2d;
            --muted-foreground: #a0a0a0;
            --accent: #2d2d2d;
            --accent-foreground: #f5f5f5;
            --destructive: #ff9f49;
            --destructive-foreground: #f5f5f5;
            --border: #2d2d2d;
            --input: #2d2d2d;
            --ring: #c5c5c5;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
        }

        .text-center {
            text-align: center;
        }

        .loader img {
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }

        .text-muted-foreground {
            color: var(--muted-foreground);
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <div class="text-center">
        <div class="loader mb-4">
            <img aria-hidden="true" alt="loading-spinner" src="https://i.giphy.com/3oEjI6SIIHBdRxXI40.webp" />
        </div>
        <b><p class="text-muted-foreground">Please wait while we are processing your request...</p></b>
    </div>

    <script>
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Claim Sent Successfully!',
                text: 'You will be redirected shortly.',
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../index.html';
            });
        }, 5000);
    </script>
</body>
</html>
