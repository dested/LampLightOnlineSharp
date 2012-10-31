using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonClientLibraries;
using CommonLibraries;
namespace TowerD.Client
{
    public class ParticleSystem
    {
        private readonly int myNumOfCaches;
        private int totalEmited;
        [IntrinsicProperty]
        public double EmitCounter { get; set; }
        [IntrinsicProperty]
        public double EmissionRate { get; set; }
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

        public ParticleSystem(int numOfCaches)
        {
            myNumOfCaches = numOfCaches;
            MaxParticles = 150;
            Particles = new List<Particle>();
            Active = true;

            Position = new Point(100, 100);
            PositionRandom = new Point(10, 10);
            Size = 45;
            SizeRandom = 8;
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
            MaxEmitted = -1;

            ElapsedTime = 0;
            Duration = -1;
            EmissionRate = 0;
            EmitCounter = 0;
        }

        public void Init()
        {
            EmissionRate = (double)MaxParticles / LifeSpan;
            EmitCounter = 0;
            BuildCaches();
        }
        int tick;
        private int curRand = (int) ( Math.Random()*100 );
        public Particle AddParticle()
        {
            if (Particles.Count == MaxParticles) return null;


            if (tick++ % curRand == 0)
            {
                caches[(int) ( ( caches.Count - 1 ) * Math.Random() )] = newCache();
                curRand = (int) ( Math.Random() * 100 );
            }

            // Take the next particle out of the particle pool we have created and initialize it	
            var particle = new Particle();
            initParticle(particle);
            Particles.Add(particle);
            // Increment the particle count 
            return particle;
        }

        [IntrinsicProperty]
        public int MaxEmitted { get; set; }

        private static double Random()
        {
            return Math.Random() * 2 - 1;
        }

        public class ParticleSystemCache
        {
            [IntrinsicProperty]
            public int Size { get; set; }
            [IntrinsicProperty]
            public int TimeToLive { get; set; }
            [IntrinsicProperty]
            public double Sharpness { get; set; }
            [IntrinsicProperty]
            public double[] Start { get; set; }
            [IntrinsicProperty]
            public double[] End { get; set; }
            [IntrinsicProperty]
            public List<CanvasInformation> Images { get; set; }
         }
        private List<ParticleSystemCache> caches = new List<ParticleSystemCache>();

        private void BuildCaches()
        {
            for (int i = 0; i < myNumOfCaches; i++)
            {
                caches.Add(newCache());

            }
        }

        private ParticleSystemCache newCache()
        {
            return new ParticleSystemCache() {
                                                     Size = (int) ( Size + SizeRandom * Random() ),
                                                     TimeToLive = ( (int) ( LifeSpan + LifeSpanRandom * Random() ) ),
                                                     Sharpness = Sharpness + SharpnessRandom * Random(),
                                                     Start = new[]{
                                                                          StartColor[0] + StartColorRandom[0] * Random(),
                                                                          StartColor[1] + StartColorRandom[1] * Random(),
                                                                          StartColor[2] + StartColorRandom[2] * Random(),
                                                                          StartColor[3] + StartColorRandom[3] * Random()
                                                                  },
                                                     End = new[]{
                                                                        EndColor[0] + EndColorRandom[0] * Random(),
                                                                        EndColor[1] + EndColorRandom[1] * Random(),
                                                                        EndColor[2] + EndColorRandom[2] * Random(),
                                                                        EndColor[3] + EndColorRandom[3] * Random()
                                                                }
                                             };
        }

        public ParticleSystemCache RandomCaches()
        {
            return caches[(int) ( Math.Random() * ( caches.Count - 1 ) )];
        }


        private void initParticle(Particle particle)
        {
            var cache = RandomCaches();

            particle.System = this;

            particle.Position.X = (int) ( Position.X + PositionRandom.X * Random() );
            particle.Position.Y = (int) ( Position.Y + PositionRandom.Y * Random() );

            var newAngle = ( Angle + AngleRandom * Random() ) * ( Math.PI / 180 ); // convert to radians
            var vector = new DoublePoint(Math.Cos(newAngle), Math.Sin(newAngle)); // Could move to lookup for speed
            var vectorSpeed = Speed + SpeedRandom * Random();
            particle.Direction = vector.Multiply(vectorSpeed);

            particle.Size = cache.Size;
            particle.Size = particle.Size < 0 ? 0 : ~~(int) particle.Size;
            particle.TimeToLive = cache.TimeToLive;

            particle.Sharpness = cache.Sharpness;
            particle.Sharpness = particle.Sharpness > 100 ? 100 : particle.Sharpness < 0 ? 0 : particle.Sharpness;
            // internal circle gradient size - affects the sharpness of the radial gradient
            particle.SizeSmall = (int) ( ( particle.Size / 200 ) * particle.Sharpness ); //(size/2/100)

            double[] start = cache.Start;

            double[] end = cache.End;

            particle.Color = start;
            particle.DeltaColor[0] = ( end[0] - start[0] ) / particle.TimeToLive;
            particle.DeltaColor[1] = ( end[1] - start[1] ) / particle.TimeToLive;
            particle.DeltaColor[2] = ( end[2] - start[2] ) / particle.TimeToLive;
            particle.DeltaColor[3] = ( end[3] - start[3] ) / particle.TimeToLive;

            particle.BuildCache(1, cache);

            if (Game.DebugText[1].Falsey())
                Game.DebugText[1] = 0;
            Game.DebugText[1] = (int) Game.DebugText[1] + 1;
        }

        public void Update(int delta)
        {
            if (MaxEmitted != -1 && totalEmited > MaxEmitted) {
                Active = false;
            }
            if (Active && EmissionRate > 0) {
                var rate = 1 / EmissionRate;
                EmitCounter += delta;
                while (Particles.Count < MaxParticles && EmitCounter > rate) {
                    AddParticle();
                    totalEmited++;
                    EmitCounter -= rate;
                }
                ElapsedTime += delta;
                if (Duration != -1 && Duration < ElapsedTime) Stop();
            }

            for (int index = Particles.Count - 1; index >= 0; index--) {
                var currentParticle = Particles[index];
                if (!currentParticle.Update(delta)) {
                    Particles.Remove(currentParticle);
                    Game.DebugText[1] = (int) Game.DebugText[1] - 1;
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
                particle.Render(context,false);
            }
        }
    }
}