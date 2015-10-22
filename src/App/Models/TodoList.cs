using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class TodoList
    {
			public string Title;
			public List<Entry> Entries; 
    }
		
		public class Entry
		{
			public string Text;
		}
}
