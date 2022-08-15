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
    public class InternNoteController : ControllerBase
    {
        private readonly InternContext _context;

        public InternNoteController(InternContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternNote>>> GetIternNotes()
        {
            var internNotes = _context.InternNotes.ToList();
            return Ok(internNotes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InternNote>> GetIternNote(int id)
        {
            var internNote = await _context.InternNotes.FindAsync(id);

            if (internNote == null) return NotFound();

            return Ok(internNote);
        }

        //POST
        [HttpPost]
        public async Task<ActionResult<InternNote>> PostIntern(InternNote internNote)
        {
            await _context.InternNotes.AddAsync(internNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIternNote), new { id = internNote.Id }, internNote);
        }


        //PUT
        [HttpPut("{id}")]
        public async Task<ActionResult<InternNote>> PutIntern(int id, InternNote internNote)
        {
            if (id != internNote.Id)
            {
                return NotFound();
            }

            _context.Entry(internNote).State = EntityState.Modified;

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
        public async Task<ActionResult<InternNote>> DeleteIternNote(int id)
        {
            var Note = _context.InternNotes.Where(t => t.Id == id).FirstOrDefault();

            if (Note == null)
            {
                return NotFound();
            }
            else
            {
                _context.InternNotes.Remove(Note);
                await _context.SaveChangesAsync();
                return Ok();

            }
        }

        private bool TodoInternExists(int id)
        {
            return _context.InternNotes.Any(e => e.Id == id);
        }
    }
}
