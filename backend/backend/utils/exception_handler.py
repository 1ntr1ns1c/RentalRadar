"""Custom DRF exception handler for consistent JSON error responses."""
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None and isinstance(response.data, dict):
        # Normalize error message for frontend (expects 'message' in many places)
        if 'detail' in response.data and 'message' not in response.data:
            detail = response.data['detail']
            if isinstance(detail, list):
                response.data['message'] = ' '.join(str(d) for d in detail)
            else:
                response.data['message'] = str(detail)
    return response
