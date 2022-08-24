using System;
using System.Collections.Generic;

#nullable disable

namespace Inern_management.Models
{
    public partial class Intern
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SexCode { get; set; }
        public DateTime? Borndate { get; set; }
        public string LineId { get; set; }
        public string Phonenumber { get; set; }
        public string EMail { get; set; }
        public bool Lock { get; set; }
    }
}
