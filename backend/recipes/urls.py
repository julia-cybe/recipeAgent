from django.urls import path
from .views import LogoutView, RegisterView, LoginView, UserRecipeListView, RecipeCreateView

urlpatterns = [
    # Endpoints for user authentication and registration
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # Endpoints for recipes
    path('my-recipes/', UserRecipeListView.as_view(), name='user-recipes'),
    path('recipes/', RecipeCreateView.as_view(), name='recipe-create'),
]