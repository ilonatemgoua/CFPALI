import { useState } from 'react'
import { levelTestQuestions, scoreToLevel } from '../data/content.js'

export default function LevelTestModal({ onClose }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = levelTestQuestions.length
  const question = levelTestQuestions[step]

  function answer(optionIndex) {
    if (optionIndex === question.correct) setScore((s) => s + 1)
    if (step + 1 < total) {
      setStep((s) => s + 1)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setStep(0)
    setScore(0)
    setFinished(false)
  }

  const result = finished ? scoreToLevel(score, total) : null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {!finished ? (
          <>
            <h4 style={{ marginBottom: 4 }}>Test de niveau rapide</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(23,36,29,0.6)', margin: 0 }}>
              Question {step + 1} / {total}
            </p>
            <div className="progress-bar">
              <div style={{ width: `${((step + 1) / total) * 100}%` }} />
            </div>
            <p style={{ fontWeight: 600, marginBottom: 16 }}>{question.q}</p>
            {question.options.map((opt, i) => (
              <button className="test-option" key={opt} onClick={() => answer(i)}>
                {opt}
              </button>
            ))}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="result-badge">{result.code}</div>
            <h4 style={{ marginBottom: 6 }}>Votre niveau estimé : {result.label}</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(23,36,29,0.65)', marginBottom: 24 }}>
              Vous avez obtenu {score} / {total} bonnes réponses. Ce résultat est indicatif — un test complet et
              un entretien avec un formateur affineront votre niveau réel.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost" onClick={restart}>
                Refaire le test
              </button>
              <a href="#inscription" className="btn btn-primary" onClick={onClose}>
                S'inscrire avec ce niveau
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
