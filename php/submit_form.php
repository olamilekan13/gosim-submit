<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data and prevent null errors
    $fullName = htmlspecialchars($_POST['fullName'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $cityState = htmlspecialchars($_POST['cityState'] ?? '');
    $contactMethod = htmlspecialchars($_POST['contactMethod'] ?? '');
    $days = isset($_POST['days']) ? implode(", ", array_map('htmlspecialchars', $_POST['days'])) : 'Not Provided';
    $availableTimes = htmlspecialchars($_POST['availableTimes'] ?? '');
    $interests = isset($_POST['interests']) ? implode(", ", array_map('htmlspecialchars', $_POST['interests'])) : 'Not Provided';
    $skillsExperience = htmlspecialchars($_POST['skillsExperience'] ?? '');
    $signature = htmlspecialchars($_POST['signature'] ?? '');
    $date = htmlspecialchars($_POST['date'] ?? '');

    // Prepare email content for admin
    $adminEmail = "registration@gosim-summit.org";
    $subject = "New Volunteer Registration";
    $message = "
    <html>
    <head>
        <title>New Volunteer Registration</title>
    </head>
    <body>
        <h2>Volunteer Registration Details</h2>
        <p><strong>Full Name:</strong> $fullName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>City/State:</strong> $cityState</p>
        <p><strong>Preferred Contact Method:</strong> $contactMethod</p>
        <p><strong>Available Days:</strong> $days</p>
        <p><strong>Available Times:</strong> $availableTimes</p>
        <p><strong>Interests:</strong> $interests</p>
        <p><strong>Skills/Experience:</strong> $skillsExperience</p>
        <p><strong>Signature:</strong> $signature</p>
        <p><strong>Date:</strong> $date</p>
    </body>
    </html>";

    // Set headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@gosim-summit.org" . "\r\n"; 

    // Send email to admin
    if (mail($adminEmail, $subject, $message, $headers)) {
        // Prepare autoresponder email
        $autoReplySubject = "Thank You for Registering - Gosim Summit";
        $autoReplyMessage = "
        <html>
        <head>
            <title>Thank You for Registering</title>
        </head>
        <body>
            <h2>Thank You, $fullName!</h2>
            <p>We have received your volunteer registration and look forward to seeing you at the summit.</p>
            <p>If you have any questions, please contact us at <a href='mailto:info@gosim-summit.org'>info@gosim-summit.org</a>.</p>
            <p>Best Regards,<br>Gosim Summit Team</p>
        </body>
        </html>";

        // Headers for the autoresponder email
        $autoReplyHeaders = "MIME-Version: 1.0" . "\r\n";
        $autoReplyHeaders .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $autoReplyHeaders .= "From: Gosim Summit <no-reply@gosim-summit.org>" . "\r\n";

        // Send autoresponder email to the user
        mail($email, $autoReplySubject, $autoReplyMessage, $autoReplyHeaders);

        // Success message
        echo "Email sent successfully.";
    } else {
        echo "There was a problem with your submission. Please try again.";
    }
}
?>
