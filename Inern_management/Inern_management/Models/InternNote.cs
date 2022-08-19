using System;
using System.Collections.Generic;

#nullable disable

namespace Inern_management.Models
{
    public partial class InternNote
    {
        public int Id { get; set; }
        public int NameId { get; set; }
        public string NoteTitle { get; set; }
        public string Note { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateModifited { get; set; }
    }
}
