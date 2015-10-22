using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using App.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactAppSkeleton5.API
{
	[Route("api/lists")]
	public class ListsController : Controller
	{
		static IEnumerable<TodoList> lists = new TodoList[] {
			new TodoList() {
				Title = "List 1",
				Entries = new List<Entry> {
					new Entry() { Text = "Do A" },
					new Entry() { Text = "Do B" },
					new Entry() { Text = "Maybe do C" }
				}
			}
		};

		// GET: api/lists
		[HttpGet]
		public IEnumerable<TodoList> Get()
		{
			return lists;
		}

		// GET api/lists/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/lists
		[HttpPost]
		public void Post([FromBody]string value)
		{
		}

		// PUT api/lists/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/lists/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
