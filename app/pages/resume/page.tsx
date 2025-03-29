"use client"

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/*Left Section*/}
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]">
              Life Story
            </h1>
            <div className="space-y-4 pt-6">
              <div className="h-px bg-white/10 w-full" />
              <div className="h-pix font-light text-sm text-white/60">
                <div className="md:w-[310px] pl-4">
                  <p className="leading-[200%]">
                    Here's a collection of my life's greatest hits and achievements.
                    Including that time I became the Pizza Party King! 🍕
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Right Section - Timeline*/}
        <div className="w-full md:w-[calc(100%-340px)] bg-zinc-900 rounded-lg p-8">
          <div className="space-y-8 text-white/80">
            <TimelineEvent year="2003" text="Born on December 9th! 🎉" />
            <TimelineEvent year="2010" text="Successfully conquered the tallest tree in my 小區. Tree climbing champion of 2nd grade! 🌳" />
            <TimelineEvent year="2013" text="Big move from Beijing to Kaohsiung! 北京 ✈️ 高雄" />
            <TimelineEvent year="2014" text="成功獲得國小閱冠王之稱，並且受邀到閱冠王pizza party 👑🍕" />
            <TimelineEvent year="2015" text="Graduated from elementary school! Goodbye, childhood! 🎓" />
            <TimelineEvent year="2015" text="New chapter begins at KAS 📚" />
            <TimelineEvent year="2021" text='Graduated with the prestigious "Most Likely to Become a Telephone Pole" award 📱' />
            <TimelineEvent year="Present" text="Studying Chemical Engineering at NTUsg 🧪" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineEvent({ year, text }: { year: string; text: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-20 flex-shrink-0 font-mono text-white/40">{year}</div>
      <div className="flex-1">{text}</div>
    </div>
  );
}

