export default function AboutSection({ section }) {
  return (
    <section className="bg-white p-6 rounded-md border shadow-sm mb-6">
      <h3 className="text-2xl font-semibold text-yellow-800 mb-3">
        {section.title}
      </h3>

      {section.content && (
        <p className="text-gray-700 leading-relaxed">{section.content}</p>
      )}

      {section.points && (
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {section.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
