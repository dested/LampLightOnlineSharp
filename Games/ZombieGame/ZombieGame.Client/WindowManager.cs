﻿namespace ZombieGame.Client
{
    public class WindowManager
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public WindowManager(int x, int y, int width, int height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }
    }
}