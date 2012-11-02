using System;
using System.Collections.Generic;
namespace CommonAPI
{
    public class TaskHandler
    {
        private int current = 0;
        public List<Action<Completed>> Tasks { get; set; }

        public TaskHandler()
        {
            Tasks = new List<Action<Completed>>();
        }

        public static TaskHandler Start(Action<Completed> task)
        {
            return new TaskHandler().AddTask(task);
        }

        public TaskHandler AddTask(Action<Completed> task)
        {
            Tasks.Add(task);
            return this;
        }

        public void Do()
        {
            Tasks[current++](happen);
        }

        public void happen()
        {
            if (current == Tasks.Count)
                return;
            Tasks[current++](happen);
        }
    }
}