#include <stdio.h>
#include <stdlib.h>
#include <math.h>

/*
 * Função que recebe uma matriz e calcula o determinante
 * @PARAMETROS
 * - matriz: a matriz com os valores a serem calculados
 *
 * @RETORNO: valor inteiro com a resposta
 */
int determinante (int *matriz, int tamanho)
{
    int determinante = 0;       // Armazena o valor a ser retornado
    int auxiliar[2];            // Armazena os valores das multiplicações
    int i;                      // Auxilia no primeiro loop
    int j;                      // Auxilia no segundo loop
    int ponto;                  // Armazena o valor do segundo eixo
    int negativo;               // Armazena o valor do eixo oposto

    for (i = 0; i < tamanho; i++)   // Primeiro loop
    {
        auxiliar[0] = 1;
        auxiliar[1] = 1;
        for (j = 0; j < tamanho; j++)   // Segundo Loop
        {
            // Valor do segundo eixo
            ponto        = (j + i) % tamanho;
            // Calcula o eixo principal para valores negativos
            negativo     = tamanho - j - 1;
            // Calcula valores positivos
            auxiliar[0] *= (matriz[j*w+ponto]);
            // Calcula valorer negativos
            auxiliar[1] *= matriz[negativo*w+ponto];
        }

        determinante += auxiliar[0] - auxiliar[1];
    }

    return determinante;       // Retorna a soma dos valores
}

int main(int argc, char const *argv[])
{
    int tamanho;  // Armazena as dimenções da matriz
    int num;
    tamanho = 3;
    int matriz[tamanho][tamanho];

    matriz[0][0] = 2;
    matriz[0][1] = 5;
    matriz[0][2] = 3;

    matriz[1][0] = 5;
    matriz[1][1] = 3;
    matriz[1][2] = -10;

    matriz[2][0] = 1;
    matriz[2][1] = 1;
    matriz[2][2] = 1;


    num = determinante(&matriz, 3);
    printf("%d",num);
    return 0;
}
