using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public required string Local { get; set; }
        public required string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         //MinLength(3, ErrorMessage = "{0} deve ter no minimo 4 caracteres."),
         //MaxLength(50, ErrorMessage = "{0} deve ter no maximo 50 caracteres.")
         StringLength(50, MinimumLength = 3,
                          ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")]
        public required string Tema { get; set; }

        [Display(Name = "Qtd Pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} nao pode ser menor que 1 e maior que 120.000.")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Nao e uma imagem valida. (gif, jpg, jpeg, bmp ou png).")]
        public required string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         Phone(ErrorMessage = "O campo {0} esta com numero invalido.")]
        public required string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         Display(Name = "e-mail"),
         EmailAddress(ErrorMessage = "E necessario ser um {0} valido.")]
        public required string Email { get; set; }

        public IEnumerable<LoteDto>? Lotes { get; set; }
        public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
        public IEnumerable<PalestranteDto>? Palestrantes  { get; set; }
    }
}