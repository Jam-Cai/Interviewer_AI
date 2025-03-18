import React from 'react';

function ProblemDescription({ problem }) {
  return (
    <div className="border-r-4 border-(--border) w-full p-10 pb-8 overflow-y-auto" style={{ "scrollbar-color": "var(--code-stroke) var(--background)" }} >
      <h1 className="text-[15px] border-l-4 leading-[1.15] pl-3 mr-5">Problem Description</h1>
      <h1 className="text-[25px] font-bold mt-2.5 ">{problem.id + ". " + problem.title}</h1>

      <p className={`mt-2 w-min px-3 text-(--background) text-[14px] rounded-full ${problem.difficulty === "Easy" ? "bg-(--green)" : problem.difficulty === "Medium" ? "bg-(--orange)" : "bg-(--red)"}`}>{problem.difficulty}</p>

        <p className="mt-5 text-[15px] leading-[1.75] font-thin mb-8">
          {(problem.explanation).split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line.split(/`([^`]+)`/g).map((segment, i) =>
                i % 2 === 1 ? (
                  <code key={i} className="rounded-md p-[3px] text-(--code-text) bg-(--code-stroke)/50 text-[13px]">
                    {segment}
                  </code>
                ) : (
                  segment
                )
              )}
              <br />
            </React.Fragment>
          ))}
        </p>

      {
        problem.examples.map((example, index) => (
          <div key={index}>
            <h1 className="text-[15px] font-bold mb-2">{problem.examples.length > 1 ? `Example ${index + 1}` : 'Example'}</h1>

            <div className="p-2 pl-4 mb-7 mr-5 bg-(--code-fill) rounded-lg border-(--code-stroke) border-3">
              <code className="text-[13px] text-(--code-text)">
              {example.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line.replace(/(Input:|Output:|Explanation:)/g, (match) => `<strong>${match}</strong>`)
                    .split(/(<strong>.*?<\/strong>)/g)
                    .map((segment, i) =>
                      segment.startsWith("<strong>") ? (
                        <strong className="font-extrabold" key={i}>{segment.replace(/<\/?strong>/g, "")}</strong>
                      ) : (
                        segment
                      )
                    )}
                  <br />
                </React.Fragment>
              ))}
              </code>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProblemDescription