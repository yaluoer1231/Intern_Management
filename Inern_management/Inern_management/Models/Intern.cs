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
        public string EMail { get; set; }
    }
}
