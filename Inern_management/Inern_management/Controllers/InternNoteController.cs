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

        //全部列出(除鎖定的)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternNoteDTO>>> GetIternNotes()
        {
            //比對和Intern相同資料ID的實習生名字後輸出需要的資料
            var internNotes = GetNoteDTO();
            
            return Ok(internNotes);
        }

        //條件查詢
        [HttpGet("{id}")]
        public async Task<ActionResult<InternNote>> GetIternNote(int id)
        {

            var internNote = GetNoteDTO();
            
            if (internNote == null) return NotFound();//如果沒有直接回傳404錯誤

            
            if (id == 0)        //依修改日期新到舊排序
                internNote = internNote.OrderByDescending(x => x.DateModifited);
            else if (id == -1)  //依修改日期舊到新排序
                internNote = internNote.OrderBy(x => x.DateModifited);
            else if (id == -2)  //依實習生序號低到高排序
                internNote = internNote.OrderBy(x => x.NameId);
            else if (id == -3)  //依實習生序號高到低排序
                internNote = internNote.OrderByDescending(x => x.NameId);
            else                //查詢其中一位的實習生的筆記
                internNote = internNote.Where(I => I.NameId == id);

            return Ok(internNote);
        }

        //POST：新增
        [HttpPost]
        public async Task<ActionResult<InternNote>> PostIntern(InternNote internNote)
        {
            internNote.DateCreate = DateTime.Now;
            internNote.DateModifited = internNote.DateCreate;
            await _context.InternNotes.AddAsync(internNote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIternNote), new { id = internNote.Id }, internNote);
        }


        //PUT：修改
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
                internNote.DateModifited = DateTime.Now;
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

        //DELETE：匯入文章Id刪除對應文章
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

        private IQueryable<InternNoteDTO> GetNoteDTO()
        {
            var NoteDTO = from I in _context.Interns
                          join N in _context.InternNotes on I.Id equals N.NameId
                          where I.Lock == false
                          orderby N.DateModifited descending
                          select new InternNoteDTO(){ 
                              Id = N.Id, 
                              Name = I.Name, 
                              NameId = N.NameId, 
                              NoteTitle = N.NoteTitle, 
                              Email = I.EMail,
                              Note = N.Note, 
                              DateCreate = N.DateCreate, 
                              DateModifited = N.DateModifited 
                          };
            return NoteDTO;
        }
    }
}
