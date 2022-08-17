using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Inern_management.Models
{
    public partial class InternContext : DbContext
    {
        public InternContext()
        {
        }

        public InternContext(DbContextOptions<InternContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Intern> Interns { get; set; }
        public virtual DbSet<InternNote> InternNotes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-VPN7M0U;Database=Intern_management;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Chinese_Taiwan_Stroke_CI_AS");

            modelBuilder.Entity<Intern>(entity =>
            {
                entity.ToTable("Intern");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EMail)
                    .HasColumnType("text")
                    .HasColumnName("e_mail");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("name");

                entity.Property(e => e.SexCode).HasColumnName("sex_code");
            });

            modelBuilder.Entity<InternNote>(entity =>
            {
                entity.ToTable("Intern_Note");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateCreate)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreate");

                entity.Property(e => e.DateModifited)
                    .HasColumnType("datetime")
                    .HasColumnName("dateModifited");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("name");

                entity.Property(e => e.Note)
                    .HasColumnType("text")
                    .HasColumnName("note");

                entity.Property(e => e.NoteTitle)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("noteTitle");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
