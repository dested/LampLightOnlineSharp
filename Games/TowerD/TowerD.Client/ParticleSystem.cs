﻿using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace TowerD.Client
{
    public class ParticleSystem
    {
        public JsDictionary<string, Gradient> cachedGrads = new JsDictionary<string, Gradient>();

        [IntrinsicProperty]
        public int EmitCounter { get; set; }
        [IntrinsicProperty]
        public int EmissionRate { get; set; }
        [IntrinsicProperty]
        public int Duration { get; set; }
        [IntrinsicProperty]
        public int ElapsedTime { get; set; }
        [IntrinsicProperty]
        public int LifeSpan { get; set; }
        [IntrinsicProperty]
        public int LifeSpanRandom { get; set; }
        [IntrinsicProperty]
        public DoublePoint Gravity { get; set; }
        [IntrinsicProperty]
        public int Sharpness { get; set; }
        [IntrinsicProperty]
        public int SharpnessRandom { get; set; }
        [IntrinsicProperty]
        public int[] EndColorRandom { get; set; }
        [IntrinsicProperty]
        public int[] EndColor { get; set; }
        [IntrinsicProperty]
        public int[] StartColorRandom { get; set; }
        [IntrinsicProperty]
        public int[] StartColor { get; set; }
        [IntrinsicProperty]
        public int AngleRandom { get; set; }
        [IntrinsicProperty]
        public int Angle { get; set; }
        [IntrinsicProperty]
        public double SpeedRandom { get; set; }
        [IntrinsicProperty]
        public int Speed { get; set; }
        [IntrinsicProperty]
        public int SizeRandom { get; set; }
        [IntrinsicProperty]
        public int Size { get; set; }
        [IntrinsicProperty]
        public Point PositionRandom { get; set; }
        [IntrinsicProperty]
        public Point Position { get; set; }
        [IntrinsicProperty]
        public bool Active { get; set; }
        [IntrinsicProperty]
        public List<Particle> Particles { get; set; }
        [IntrinsicProperty]
        public int MaxParticles { get; set; }

        public ParticleSystem()
        {
            MaxParticles = 150;
            Particles = new List<Particle>();
            Active = true;

            Position = new Point(100, 100);
            PositionRandom = new Point(10, 10);
            Size = 45;
            SizeRandom = 15;
            Speed = 5;
            SpeedRandom = 1.5;
            LifeSpan = 9;
            LifeSpanRandom = 7;
            Angle = 0;
            AngleRandom = 360;
            Gravity = new DoublePoint(0.4, 0.2);
            StartColor = new int[] {250, 218, 68, 1};
            StartColorRandom = new int[] {5, 5, 5, 0};
            EndColor = new int[] {245, 35, 0, 0};
            EndColorRandom = new int[] {5, 5, 5, 0};
            Sharpness = 40;
            SharpnessRandom = 10;

            ElapsedTime = 0;
            Duration = -1;
            EmissionRate = 0;
            EmitCounter = 0;
        }

        public void Init()
        {
            EmissionRate = MaxParticles / LifeSpan;
            EmitCounter = 0;
        }

        public Particle AddParticle()
        {
            if (Particles.Count == MaxParticles) return null;
            // Take the next particle out of the particle pool we have created and initialize it	
            var particle = new Particle();
            initParticle(particle);
            Particles.Add(particle);
            // Increment the particle count 
            return particle;
        }

        private void initParticle(Particle particle)
        {
            particle.System = this;
            Func<double> RANDM1TO1 = () => { return Math.Random() * 2 - 1; };

            particle.Position.X = (int) ( Position.X + PositionRandom.X * RANDM1TO1() );
            particle.Position.Y = (int) ( Position.Y + PositionRandom.Y * RANDM1TO1() );

            var newAngle = ( Angle + AngleRandom * RANDM1TO1() ) * ( Math.PI / 180 ); // convert to radians
            var vector = new DoublePoint(Math.Cos(newAngle), Math.Sin(newAngle)); // Could move to lookup for speed
            var vectorSpeed = Speed + SpeedRandom * RANDM1TO1();
            particle.Direction = vector.Multiply(vectorSpeed);

            particle.Size = Size + SizeRandom * RANDM1TO1();
            particle.Size = particle.Size < 0 ? 0 : ~~(int) particle.Size;
            particle.TimeToLive = LifeSpan + LifeSpanRandom * RANDM1TO1();

            particle.Sharpness = Sharpness + SharpnessRandom * RANDM1TO1();
            particle.Sharpness = particle.Sharpness > 100 ? 100 : particle.Sharpness < 0 ? 0 : particle.Sharpness;
            // internal circle gradient size - affects the sharpness of the radial gradient
            particle.SizeSmall = ~~(int) ( ( particle.Size / 200 ) * particle.Sharpness ); //(size/2/100)

            double[] start = {
                                     StartColor[0] + StartColorRandom[0] * RANDM1TO1(),
                                     StartColor[1] + StartColorRandom[1] * RANDM1TO1(),
                                     StartColor[2] + StartColorRandom[2] * RANDM1TO1(),
                                     StartColor[3] + StartColorRandom[3] * RANDM1TO1()
                             };

            double[] end = {
                                   EndColor[0] + EndColorRandom[0] * RANDM1TO1(),
                                   EndColor[1] + EndColorRandom[1] * RANDM1TO1(),
                                   EndColor[2] + EndColorRandom[2] * RANDM1TO1(),
                                   EndColor[3] + EndColorRandom[3] * RANDM1TO1()
                           };

            particle.Color = start;
            particle.DeltaColor[0] = ( end[0] - start[0] ) / particle.TimeToLive;
            particle.DeltaColor[1] = ( end[1] - start[1] ) / particle.TimeToLive;
            particle.DeltaColor[2] = ( end[2] - start[2] ) / particle.TimeToLive;
            particle.DeltaColor[3] = ( end[3] - start[3] ) / particle.TimeToLive;

            particle.BuildCache(1);

            if (Game.DebugText[1].Falsey())
            {
                Game.DebugText[1] = 0;
            }
            Game.DebugText[1] = (int)Game.DebugText[1] + 1;



        }

        public void Update(int delta)
        { 
            if (Active && EmissionRate > 0) {
                var rate = 1 / EmissionRate;
                EmitCounter += delta;
                while (Particles.Count < MaxParticles && EmitCounter > rate) {
                    AddParticle();
                    EmitCounter -= rate;
                }
                ElapsedTime += delta;
                if (Duration != -1 && Duration < ElapsedTime) Stop();
            }

            for (int index = Particles.Count - 1; index >= 0; index--) {
                var currentParticle = Particles[index];
                if (!currentParticle.Update(delta)) {
                    Particles.Remove(currentParticle);
                    Game.DebugText[1] = (int)Game.DebugText[1] -1;

                }
            }
        }

        public void Stop()
        {
            Active = false;
            ElapsedTime = 0;
            EmitCounter = 0;
        }

        public void Render(CanvasContext2D context)
        {
            foreach (var particle in Particles) {

                particle.Render(context);

            }
        }
    }
}