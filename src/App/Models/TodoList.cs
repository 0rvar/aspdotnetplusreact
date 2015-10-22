using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class TodoList
    {
			public string title;
			public List<Entry> entries; 
    }
		
		public class Entry
		{
			public bool done;
			public string text;
		}
}
