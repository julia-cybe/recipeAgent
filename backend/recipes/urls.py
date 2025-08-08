from django.urls import path
from .views import LogoutView, RecipeFileUploadView, RegisterView, LoginView, TokenRefreshView, UserRecipeListView, RecipeCreateView

urlpatterns = [
    # Endpoints for user authentication and registration
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoints for recipes
    path('my-recipes/', UserRecipeListView.as_view(), name='user-recipes'),
    path('recipes/', RecipeCreateView.as_view(), name='recipe-create'),

    # Endpoints for recipe file upload
    path('recipes/upload/', RecipeFileUploadView.as_view(), name='recipe-upload'),
]
