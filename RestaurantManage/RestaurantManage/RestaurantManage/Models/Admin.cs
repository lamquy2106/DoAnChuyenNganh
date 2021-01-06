using System;
using System.Collections.Generic;

#nullable disable

namespace RestaurantManage.Models
{
    public partial class Admin
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Accout { get; set; }
        public string Password { get; set; }
    }
}
