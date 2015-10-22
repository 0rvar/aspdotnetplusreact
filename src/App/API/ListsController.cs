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
		static List<TodoList> lists = new List<TodoList> {
			new TodoList() {
				title = "Sample list",
				entries = new List<Entry> {
					new Entry() { text = "Do A" },
					new Entry() { text = "Do B" },
					new Entry() { text = "Maybe do C" }
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
		public object Post([FromBody]TitleContainer titleContainer)
		{
			var list = new TodoList()
			{
				title = titleContainer.title,
				entries = new List<Entry>
				{
					new Entry() { text = "Perform Arbitrary Task" }
				}
			};
			lists.Add(list);

			return new {
				lists = lists,
				index = lists.Count - 1
			};
		}

		[HttpPost("{listIndex}/{entryIndex}")]
		public void UpdateEntry(int listIndex, int entryIndex, [FromBody]Entry entry)
		{
			lists[listIndex].entries[entryIndex] = entry;
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

	public class TitleContainer
	{
		public string title;
	}
}
