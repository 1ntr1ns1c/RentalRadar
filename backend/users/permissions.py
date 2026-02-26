from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    """Only system superuser (role=superuser) can access."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(
            request.user, 'is_system_superuser', False
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allow access if user owns the object (object has created_by == request.user)
    or is landlord who owns it, or is system superuser.
    """

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if getattr(request.user, 'is_system_superuser', False):
            return True
        owner_id = getattr(obj, 'created_by_id', None) or getattr(obj, 'created_by', None)
        if owner_id is not None:
            return owner_id == request.user.id
        return False


class IsLandlordOrSuperUser(permissions.BasePermission):
    """Only landlords or superuser can access."""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if getattr(request.user, 'is_system_superuser', False):
            return True
        return request.user.role == 'landlord'
