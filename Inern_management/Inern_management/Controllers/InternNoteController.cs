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

    }
}
