import os
import google.generativeai as genai
import requests
import base64

# Configure Gemini API Key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_image_description(encoded_image, mime_type="image/png", char_limit=490):
    """Generates a description for the image using the Gemini API with a character limit."""
    try:
        # Initialize the generative model
        model = genai.GenerativeModel("gemini-2.0-flash")

        # Generate content with instructions for a character limit
        response = model.generate_content([
            f"Describe this image in detail in fewer than {char_limit} characters:",
            {"mime_type": mime_type, "data": encoded_image}
        ])

        # Process and return the response
        description = response.text if response else "No description available."
        return description[:char_limit]  # Truncate to ensure the limit is respected

    except Exception as e:
        raise RuntimeError(f"Error while generating image description: {str(e)}")


def analyze_image(file_url):
    """Fetch image from S3 and analyze it."""
    try:
        # Fetch the image content using the URL
        response = requests.get(file_url)
        if response.status_code != 200:
            raise ValueError(f"Failed to fetch the image from S3: {response.content}")

        # Process the image (e.g., send to an AI API or analyze directly)
        encoded_image = base64.b64encode(response.content).decode("utf-8")

        # Call your image analysis function
        return generate_image_description(encoded_image)

    except Exception as e:
        return f"Error accessing image from S3: {str(e)}"