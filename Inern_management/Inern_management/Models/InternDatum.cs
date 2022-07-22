using System;
using System.Collections.Generic;

#nullable disable

namespace Inern_management.Models
{
    public partial class InternDatum
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Sex { get; set; }
        public string EMail { get; set; }
    }
}
