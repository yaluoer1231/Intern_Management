using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inern_management.Models;
using Microsoft.EntityFrameworkCore;

namespace Inern_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternController : ControllerBase
    {
        private readonly InternContext _context;

        public InternController (InternContext context)
        {
            _context = context;
        }


        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Intern>>> GetIterns()
        {
            var intern = _context.Interns.ToList();
            return Ok(intern);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Intern>> GetItern(int id)
        {
            var intern = await _context.Interns.FindAsync(id);

            if (intern == null) return NotFound();

            return Ok(intern);
        }
        
        //POST
        [HttpPost]
        public async Task<ActionResult<Intern>> PostIntern(Intern intern)
        {
            await _context.Interns.AddAsync(intern);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItern), new { id = intern.Id }, intern);
        }
        /*
        //PUT
        [HttpPut("{id}")]
        public async Task<ActionResult<Intern>> PutIntern(int id, Intern intern)
        {
            if (id != intern.Id)
            {
                return NotFound();
            }

            _context.Entry(intern).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!TodoInternExists(id))
                {
                    return NotFound(); //404錯誤
                }
                else
                {
                    throw;
                }

            }

            return NoContent();
        }*/

        //DELETE
        /*[HttpDelete("{id}")]
        public async Task<ActionResult<Intern>> DeleteItern(int id)
        {
            var drink = _context.Interns.Where(t => t.Id == id).FirstOrDefault();

            if (drink == null)
            {
                return NotFound();
            }
            else
            {
                _context.Interns.Remove(drink);
                await _context.SaveChangesAsync();
                return Ok();

            }
        }*/
        private bool TodoInternExists(int id)
        {
            return _context.Interns.Any(e => e.Id == id);
        }


    }
}
