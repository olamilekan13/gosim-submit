<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // reCAPTCHA verification
    $recaptchaSecret = "6LdvNvIqAAAAAPupJbM7X5v9JtdTZtrgmTGj5-BE"; // Replace with your actual secret key
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseData = json_decode($verifyResponse);

    if (!$responseData->success) {
        die("reCAPTCHA verification failed. Please try again.");
    }

    // Collect form data and sanitize inputs
    $fullName = htmlspecialchars($_POST['fullName'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $address = htmlspecialchars($_POST['address'] ?? '');
    $city = htmlspecialchars($_POST['city'] ?? '');
    $state = htmlspecialchars($_POST['state'] ?? '');
    $zip = htmlspecialchars($_POST['zip'] ?? '');
    $hearAbout = htmlspecialchars($_POST['hearAbout'] ?? '');
    $group = htmlspecialchars($_POST['group'] ?? 'No');
    $groupName = htmlspecialchars($_POST['groupName'] ?? '');
    $terms = isset($_POST['terms']) ? 'Agreed' : 'Not Agreed';
    $communications = isset($_POST['communications']) ? 'Consented' : 'Not Consented';

    // Prepare email content for admin
    $adminEmail = "registr@gosim-summit.org";
    $subject = "New Summit Registration";
    $message = "<html><head><title>New Summit Registration</title></head><body>";
    $message .= "<h2>Registration Details</h2>";
    $message .= "<p><strong>Full Name:</strong> $fullName</p>";
    $message .= "<p><strong>Email:</strong> $email</p>";
    $message .= "<p><strong>Phone:</strong> $phone</p>";
    $message .= "<p><strong>Address:</strong> $address, $city, $state, $zip</p>";
    $message .= "<p><strong>Heard About:</strong> $hearAbout</p>";
    $message .= "<p><strong>Group Registration:</strong> $group</p>";
    if ($group === 'yes') {
        $message .= "<p><strong>Group Name:</strong> $groupName</p>";
    }
    $message .= "<p><strong>Terms Agreement:</strong> $terms</p>";
    $message .= "<p><strong>Communications Consent:</strong> $communications</p>";
    $message .= "</body></html>";

    // Set headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@gosim-summit.org" . "\r\n";

    // Send email to admin
    if (mail($adminEmail, $subject, $message, $headers)) {
        // Prepare autoresponder email
        $autoReplySubject = "Thank You for Registering - Gosim Summit";
        $autoReplyMessage = "<html><head><title>Thank You</title></head><body>";
        $autoReplyMessage .= "<h2>Thank You, $fullName!</h2>";
        $autoReplyMessage .= "<p>We have received your registration and look forward to seeing you at the summit.</p>";
        $autoReplyMessage .= "<p>If you have any questions, contact us at <a href='mailto:info@gosim-summit.org'>info@gosim-summit.org</a>.</p>";
        $autoReplyMessage .= "<p>Best Regards,<br>Gosim Summit Team</p>";
        $autoReplyMessage .= "</body></html>";

        // Headers for autoresponder email
        $autoReplyHeaders = "MIME-Version: 1.0" . "\r\n";
        $autoReplyHeaders .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $autoReplyHeaders .= "From: Gosim Summit <no-reply@gosim-summit.org>" . "\r\n";

        // Send autoresponder email
        mail($email, $autoReplySubject, $autoReplyMessage, $autoReplyHeaders);

        // Success message
        echo "Thank you for registering! A confirmation email has been sent to your email address.";
    } else {
        echo "There was a problem with your submission. Please try again.";
    }
}
?>
