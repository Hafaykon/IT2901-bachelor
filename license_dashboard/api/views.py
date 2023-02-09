from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as p


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    routes = [
    ]
    return Response('The api is working')


@api_view(['GET'])
def get_dataframe(request):
    df = p.read_csv('./data/compliance_per_computer_bertil.csv')
    df = df.fillna('-')
    return Response(df.columns)
