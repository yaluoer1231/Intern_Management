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
            try
            {

                var intern = _context.Interns;

                return Ok(intern);
            } catch (Exception e)
            {
                return StatusCode(500, new { message = e });
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Intern>> GetItern([FromRoute(Name = "id")] int id)
        {
            var intern = await _context.Interns.FindAsync(id);

            if (intern == null) return NotFound();

            return Ok(intern);
        }
        
        //POST
        [HttpPost]
        public async Task<ActionResult<Intern>> PostIntern([FromBody]Intern intern)
        {
            await _context.Interns.AddAsync(intern);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItern), new { id = intern.Id }, intern);
        }
        
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
        }

        //DELETE
        [HttpDelete("{id}")]
        public async Task<ActionResult<Intern>> DeleteItern(int id)
        {
            var intern = _context.Interns.Where(t => t.Id == id).FirstOrDefault();
            var internNote = _context.InternNotes.Where(n => n.NameId == id).FirstOrDefault();


            if (intern == null)
            {
                return NotFound();
            }
            else
            {
                _context.Interns.Remove(intern);
                if (internNote != null)
                    _context.InternNotes.Remove(internNote);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
        private bool TodoInternExists(int id)
        {
            return _context.Interns.Any(e => e.Id == id);
        }
    }
}
