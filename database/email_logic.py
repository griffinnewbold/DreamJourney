import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

smtp_port = 587                 
smtp_server = "smtp.gmail.com"  
email_from = "dreamjourney2023@gmail.com"
pswd = "ofkjrkycmpvxfhtj"

def send_emails(email_list, subject):

    for person in email_list:

        # Make the body of the email
        body = f"""
        Welcome to our service kind user! We are very excited for you to try our product. This email serves as a confirmation that you
        have successfully created an account with our service. You can now go back and log in to see your dashboard. From there you can
        begin to track your dreams. We are very excited to see what you create! Do not hesistate go on and get started!

        We wish you the best kind user!
        - Griffin and Gabe
        """

        # make a MIME object to define parts of the email
        msg = MIMEMultipart()
        msg['From'] = email_from
        msg['To'] = person
        msg['Subject'] = subject

        # Attach the body of the message
        msg.attach(MIMEText(body, 'plain'))

        # Cast as string
        text = msg.as_string()

        # Connect with the server
        TIE_server = smtplib.SMTP(smtp_server, smtp_port)
        TIE_server.starttls()
        TIE_server.login(email_from, pswd)

        # Send emails to "person" as list is iterated
        TIE_server.sendmail(email_from, person, text)

    # Close the port
    TIE_server.quit()