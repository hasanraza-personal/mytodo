namespace backend.Models
{
    public class TodoList
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Todo { get; set; }
        public Boolean Completed { get; set; }
    }
}
