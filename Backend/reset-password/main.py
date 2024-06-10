import functions_framework
from firebase_admin import auth, initialize_app
from flask import jsonify
import sendgrid
from sendgrid.helpers.mail import Mail

initialize_app()

@functions_framework.http
def reset_password(request):
    request_json = request.get_json()

    # Verifica si se proporcionaron los datos necesarios
    if not request_json or 'email' not in request_json:
        return jsonify({'error': 'No se proporcionó la dirección de correo electrónico.'}), 400

    email = request_json['email']

    try:
        # Genera el enlace de restablecimiento de contraseña
        link = auth.generate_password_reset_link(email)
        
        # Envía el correo electrónico utilizando SendGrid
        sendgrid_client = sendgrid.SendGridAPIClient(api_key='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')
        message = Mail(
            from_email='davepj07@estudiantec.cr',
            to_emails=email,
            subject='Restablecimiento de contraseña',
            html_content=f'<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="{link}">{link}</a></p>'
        )
        sendgrid_client.send(message)
        
        return jsonify({'message': 'Se ha generado el link exitosamente.', 'link': link}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
