using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : Controller
    {
        private readonly MyTodoAPIDbContext dbContext;

        public TodoController(MyTodoAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public MyTodoAPIDbContext DBContext { get; }

        [HttpGet]
        public async Task<IActionResult> GetTodo()
        {
            return Ok(await dbContext.TodoList.ToListAsync());
        }

        [HttpPost]
        [Route("getusertodo")]
        public async Task<IActionResult> GetUserTodo(UserTodoRequest userTodoRequest)
        { 
            var userTodo = dbContext.TodoList.Where(u => u.UserId == userTodoRequest.UserId);

            return Ok(userTodo);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(AddTodoRequest addTodoRequest)
        {
            var todo = new TodoList()
            {
                Id = Guid.NewGuid(),
                UserId = addTodoRequest.UserId,
                Todo = addTodoRequest.Todo,
                Completed = false
            };

            await dbContext.TodoList.AddAsync(todo);
            await dbContext.SaveChangesAsync();

            return Ok(todo);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, UpdateTodoRequest updateTodoRequest)
        {
            var todo = await dbContext.TodoList.FindAsync(id);

            if(todo != null)
            {
                todo.Todo = updateTodoRequest.Todo;
                todo.Completed = updateTodoRequest.Completed;

                await dbContext.SaveChangesAsync();

                return Ok(todo);
            }

            return NotFound("Sorry, something went wrong");
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var todo = await dbContext.TodoList.FindAsync(id);

            if (todo != null)
            { 
                dbContext.Remove(todo);
                await dbContext.SaveChangesAsync();

                return Ok("Your Todo list has been deleted");
            }

            return NotFound("Sorry, something went wrong");
        }
    }
}
