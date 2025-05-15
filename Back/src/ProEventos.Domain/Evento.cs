using ProEventos.Domain.Identity;

namespace ProEventos.Domain
{
    public class Evento
    {
        public int Id { get; set; }
        public required string Local { get; set; }
        public DateTime? DataEvento { get; set; }
        public required string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public required string ImagemURL { get; set; }
        public required string Telefone { get; set; }
        public required string Email { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<Lote>? Lotes { get; set; }
        public IEnumerable<RedeSocial>? RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento>? PalestrantesEventos  { get; set; }
    }
}