 <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

        // Initialize EmailJS with your public key
        emailjs.init("bfpBWEYZGMbwVtQAT"); // Replace with your EmailJS public key

        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
            document.getElementById('success-message').style.display = 'none';
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const source = document.getElementById('source').value;
            const zip = document.getElementById('zip').value.trim();
            const comments = document.getElementById('comments').value.trim();
            
            // Validation
            let isValid = true;
            
            if (!name) {
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            if (phone && !/^\d{10}$/.test(phone.replace(/[-()\s]/g, ''))) {
                document.getElementById('phone-error').style.display = 'block';
                isValid = false;
            }
            
            if (!source) {
                document.getElementById('source-error').style.display = 'block';
                isValid = false;
            }
            
            if (zip && !/^\d{5}$/.test(zip)) {
                document.getElementById('zip-error').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Prepare email parameters
            const templateParams = {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                source: source,
                zip: zip || 'Not provided',
                comments: comments || 'No comments'
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    document.getElementById('success-message').style.display = 'block';
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    alert('Failed to send the message. Please try again later.');
                    console.error('EmailJS error:', error);
                });
        });
   
