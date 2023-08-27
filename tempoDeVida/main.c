#include <stdio.h>
#include <time.h>

int main() {
    int dia, mes, ano;

    printf("Digite sua data de nascimento (DD MM AAAA): ");
    scanf("%d %d %d", &dia, &mes, &ano);

    // Obtendo informações de data atual
    time_t dataAtual;
    time(&dataAtual);

    // Convertendo o tempo de segundos, para um formato tm
    struct tm *nascimento = localtime(&dataAtual);

    nascimento->tm_year = ano - 1900;
    nascimento->tm_mon = mes - 1;
    nascimento->tm_mday = dia;
    nascimento->tm_hour = 0;
    nascimento->tm_min = 0;
    nascimento->tm_sec = 0;

    // Convertendo de tm para tempo em segundos
    time_t nascimento_seconds = mktime(nascimento);

    // Retornando a diferença entre 2 tempos
    double diff_seconds = difftime(dataAtual, nascimento_seconds);

    printf("Tempo de vida em segundos: %.0lf\n", diff_seconds);

    return 0;
}
