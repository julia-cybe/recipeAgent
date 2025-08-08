from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from .models import Recipe
from .serializers import RecipeSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=400)

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=204)
        except Exception as e:
            return Response(status=400)
        
class TokenRefreshView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request):
        refresh = request.data.get('refresh')
        if not refresh:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = RefreshToken(refresh)
            return Response({
                'access': str(token.access_token),
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class UserRecipeListView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(user=self.request.user)

class RecipeCreateView(generics.CreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        
class RecipeFileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            from PIL import Image
            import pytesseract
            image = Image.open(file)
            text = pytesseract.image_to_string(image)
        except Exception as e:
            return Response({'error': f'Failed to process image: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        # Simple parsing logic (customize as needed)
        # Expecting format: Title: ...\nDescription: ...\nPreparation Steps: ...\nIngredients: ...
        title = ''
        description = ''
        preparation_steps = ''
        ingredients = []
        lines = text.split('\n')
        current_section = None
        for line in lines:
            line = line.strip()
            if not line:
                continue
            if line.lower().startswith('title:'):
                title = line[6:].strip()
                current_section = 'title'
            elif line.lower().startswith('description:'):
                description = line[12:].strip()
                current_section = 'description'
            elif line.lower().startswith('preparation steps:'):
                preparation_steps = line[18:].strip()
                current_section = 'preparation_steps'
            elif line.lower().startswith('ingredients:'):
                current_section = 'ingredients'
            elif current_section == 'ingredients':
                # Example ingredient line: "2 cups flour"
                parts = line.split()
                if len(parts) >= 3:
                    try:
                        quantity = float(parts[0])
                        unit = parts[1]
                        name = ' '.join(parts[2:])
                        ingredients.append({'name': name, 'quantity': quantity, 'unit': unit})
                    except Exception:
                        continue
        if not title:
            title = 'Untitled Recipe'
        recipe_data = {
            'title': title,
            'description': description,
            'preparation_steps': preparation_steps,
            'ingredients': ingredients,
        }
        serializer = RecipeSerializer(data=recipe_data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

