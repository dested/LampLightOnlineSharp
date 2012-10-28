using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using ClientAPI;
using CommonAPI;
using CommonLibraries;
using jQueryApi;
namespace TowerD.Client
{
    public class Game : LampClient
    {
        private LampPlayer[] myPlayers;
        private ParticleSystem p2;
        public Game() {}

        public override void Init(LampPlayer[] players, CanvasContext2D context)
        {
            myPlayers = players;

            context.CompositeOperation = CompositeOperation.Lighter;
             
            p2 = new ParticleSystem();

            // Set some properties - check the class
            p2.Position = new Point(300, 190);
            p2.StartColourRandom = new int[] {255, 255, 255, 1};
            p2.EndColourRandom = new int[] {255, 255, 255, 1};
            p2.Size = 20;
            p2.MaxParticles = 200; 

            p2.Init();
        }

        public override void Tick()
        {
            p2.Update(1);
        }

        public override bool MouseMove(jQueryEvent jQueryEvent)
        {
            p2.Position = new Point(jQueryEvent.ClientX, jQueryEvent.ClientY);
            return false;
        }

        public override bool OnClick(jQueryEvent jQueryEvent)
        {
            return base.OnClick(jQueryEvent);
        }

        public override bool MouseUp(jQueryEvent jQueryEvent)
        {
            return base.MouseUp(jQueryEvent);
        }

        public override void Draw(CanvasContext2D context)
        {
            context.CompositeOperation = CompositeOperation.Lighter;


            p2.Render(context);
        }
    }
    public class Particle
    {
        [IntrinsicProperty]
        public DoublePoint Position { get; set; }
        [IntrinsicProperty]
        public DoublePoint Direction { get; set; }
        [IntrinsicProperty]
        public double Sharpness { get; set; }
        [IntrinsicProperty]
        public double Size { get; set; }
        [IntrinsicProperty]
        public double TimeToLive { get; set; }
        [IntrinsicProperty]
        public double SizeSmall { get; set; }
        [IntrinsicProperty]
        public double[] Colour { get; set; }
        [IntrinsicProperty]
        public double[] DeltaColour { get; set; }
        [IntrinsicProperty]
        public string DrawColour { get; set; }
        [IntrinsicProperty]
        public string DrawColourTransparent { get; set; }

        public Particle()
        {
            Position = new DoublePoint(0, 0);
            Direction = new DoublePoint(0, 0);
            DeltaColour = new double[4];
            Colour = new double[4];
        }
    }
    public class ParticleSystem
    { 
        [IntrinsicProperty]
        protected int EmitCounter { get; set; }
        [IntrinsicProperty]
        protected int EmissionRate { get; set; }
        [IntrinsicProperty]
        public int Duration { get; set; }
        [IntrinsicProperty]
        protected int ElapsedTime { get; set; } 
        [IntrinsicProperty]
        protected int LifeSpan { get; set; }
        [IntrinsicProperty]
        protected int LifeSpanRandom { get; set; }
        [IntrinsicProperty]
        protected DoublePoint Gravity { get; set; }
        [IntrinsicProperty]
        protected int Sharpness { get; set; }
        [IntrinsicProperty]
        protected int SharpnessRandom { get; set; }
        [IntrinsicProperty]
        public int[] EndColourRandom { get; set; }
        [IntrinsicProperty]
        protected int[] EndColour { get; set; }
        [IntrinsicProperty]
        public int[] StartColourRandom { get; set; }
        [IntrinsicProperty]
        public int[] StartColour { get; set; }
        [IntrinsicProperty]
        protected int AngleRandom { get; set; }
        [IntrinsicProperty]
        protected int Angle { get; set; }
        [IntrinsicProperty]
        protected double SpeedRandom { get; set; }
        [IntrinsicProperty]
        protected int Speed { get; set; }
        [IntrinsicProperty]
        protected int SizeRandom { get; set; }
        [IntrinsicProperty]
        public int Size { get; set; }
        [IntrinsicProperty]
        protected Point PositionRandom { get; set; }
        [IntrinsicProperty]
        public Point Position { get; set; }
        [IntrinsicProperty]
        protected bool Active { get; set; }
        [IntrinsicProperty]
        protected List<Particle> Particles { get; set; }
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
            StartColour = new int[] {250, 218, 68, 1};
            StartColourRandom = new int[] {62, 60, 60, 0};
            EndColour = new int[] {245, 35, 0, 0};
            EndColourRandom = new int[] {60, 60, 60, 0};
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

        public Particle addParticle()
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
                                     StartColour[0] + StartColourRandom[0] * RANDM1TO1(),
                                     StartColour[1] + StartColourRandom[1] * RANDM1TO1(),
                                     StartColour[2] + StartColourRandom[2] * RANDM1TO1(),
                                     StartColour[3] + StartColourRandom[3] * RANDM1TO1()
                             };

            double[] end = {
                                   EndColour[0] + EndColourRandom[0] * RANDM1TO1(),
                                   EndColour[1] + EndColourRandom[1] * RANDM1TO1(),
                                   EndColour[2] + EndColourRandom[2] * RANDM1TO1(),
                                   EndColour[3] + EndColourRandom[3] * RANDM1TO1()
                           };

            particle.Colour = start;
            particle.DeltaColour[0] = ( end[0] - start[0] ) / particle.TimeToLive;
            particle.DeltaColour[1] = ( end[1] - start[1] ) / particle.TimeToLive;
            particle.DeltaColour[2] = ( end[2] - start[2] ) / particle.TimeToLive;
            particle.DeltaColour[3] = ( end[3] - start[3] ) / particle.TimeToLive;
        }

        public void Update(int delta)
        {
            if (Active && EmissionRate > 0) {
                var rate = 1 / EmissionRate;
                EmitCounter += delta;
                while (Particles.Count < MaxParticles && EmitCounter > rate)
                {
                    addParticle();
                    EmitCounter -= rate;
                }
                ElapsedTime += delta;
                if (Duration != -1 && Duration < ElapsedTime) Stop();
            }

            for (int index = Particles.Count-1; index >=0; index--)
            {
                var currentParticle = Particles[index];
// If the current particle is alive then update it
                if (currentParticle.TimeToLive > 0) {
                    // Calculate the new direction based on gravity
                    currentParticle.Direction = currentParticle.Direction.Add(Gravity);
                    currentParticle.Position = currentParticle.Position.Add(currentParticle.Direction);
                    currentParticle.TimeToLive -= delta;

                    // Update colours based on delta
                    var r = currentParticle.Colour[0] += ( currentParticle.DeltaColour[0] * delta );
                    var g = currentParticle.Colour[1] += ( currentParticle.DeltaColour[1] * delta );
                    var b = currentParticle.Colour[2] += ( currentParticle.DeltaColour[2] * delta );
                    var a = currentParticle.Colour[3] += ( currentParticle.DeltaColour[3] * delta );

                    // Calculate the rgba string to draw.
                    var draw = new List<string>();
                    draw.Add(( "rgba(" + ( r > 255 ? 255 : r < 0 ? 0 : ~~(int) r ) ));
                    draw.Add(( g > 255 ? 255 : g < 0 ? 0 : ~~(int) g ).ToString());
                    draw.Add(( b > 255 ? 255 : b < 0 ? 0 : ~~(int) b ).ToString());
                    draw.Add(( a > 1 ? "1" : a < 0 ? "0" : a.ToFixed(2) ) + ")");
                    currentParticle.DrawColour = draw.Join(",");
                    draw.RemoveAt(3);
                    draw.Add("0)");
                    currentParticle.DrawColourTransparent = draw.Join(",");

                } else Particles.Remove(currentParticle);
            }
        }

        private void Stop()
        {
            Active = false;
            ElapsedTime = 0;
            EmitCounter = 0;
        }

        public void Render(CanvasContext2D context)
        {
            foreach (var particle in Particles) {
                var size = particle.Size;
                var halfSize = (int) size >> 1;
                var x = ~~(int) particle.Position.X;
                var y = ~~(int) particle.Position.Y;

                var radgrad = context.CreateRadialGradient(x + halfSize, y + halfSize, particle.SizeSmall, x + halfSize, y + halfSize, halfSize);
                radgrad.AddColorStop(0, particle.DrawColour);
                radgrad.AddColorStop(1, particle.DrawColourTransparent); //Super cool if you change these values (and add more colour stops)
                context.FillStyle = radgrad;
                context.FillRect(x, y, size, size);
            }
        }
    }
}