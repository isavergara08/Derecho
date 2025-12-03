// Interactive curriculum grid with credit tracking, progress bar and lilac theme
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const TOTAL_CREDITS = 180

const semesters = [
  { name: '1° semestre', credits: 17, subjects: [
    { name: 'Lógica y Retórica', credits: 3 },
    { name: 'Teoría General del Estado', credits: 3 },
    { name: 'Introducción al Derecho', credits: 4 },
    { name: 'Matemáticas', credits: 3 },
    { name: 'Escritura Universitaria I', credits: 2 },
    { name: 'CBU I', credits: 2 }
  ]},
  { name: '2° semestre', credits: 18, subjects: [
    { name: 'Hermenéutica Jurídica', credits: 3 },
    { name: 'Derecho Romano', credits: 3 },
    { name: 'Sociología Jurídica', credits: 3 },
    { name: 'Historia de las Instituciones Jurídicas', credits: 3 },
    { name: 'Escritura Universitaria II', credits: 2 },
    { name: 'CBU II', credits: 2 },
    { name: 'CBU III', credits: 2 }
  ]},
  { name: '3° semestre', credits: 18, subjects: [
    { name: 'Juez e Interpretación Constitucional', credits: 3 },
    { name: 'Obligaciones I', credits: 5 },
    { name: 'Derecho Constitucional', credits: 5 },
    { name: 'Propiedad y Derechos Reales', credits: 3 },
    { name: 'CBU IV', credits: 2 },
    { name: 'Examen de Ciclo I', credits: 0 }
  ]},
  { name: '4° semestre', credits: 18, subjects: [
    { name: 'Teoría Jurídica', credits: 5 },
    { name: 'Obligaciones II', credits: 5 },
    { name: 'Legislación y Políticas Públicas', credits: 3 },
    { name: 'Derecho Internacional', credits: 3 },
    { name: 'CBU V', credits: 2 }
  ]},
  { name: '5° semestre', credits: 18, subjects: [
    { name: 'Procedimientos', credits: 4 },
    { name: 'Relaciones Laborales', credits: 3 },
    { name: 'Derecho Comercial', credits: 3 },
    { name: 'Derecho Penal', credits: 3 },
    { name: 'Derecho Público Administrativo', credits: 3 },
    { name: 'CBU VI', credits: 2 },
    { name: 'Requisito de lectura en inglés', credits: 0 }
  ]},
  { name: '6° semestre', credits: 17, subjects: [
    { name: 'Protección Laboral', credits: 3 },
    { name: 'Pruebas', credits: 3 },
    { name: 'Contratos', credits: 5 },
    { name: 'Penal Especial', credits: 3 },
    { name: 'Argumentación en Procesos Civiles', credits: 3 }
  ]},
  { name: '7° semestre', credits: 18, subjects: [
    { name: 'Relaciones Familiares', credits: 4 },
    { name: 'Sociedades', credits: 3 },
    { name: 'Contratos Estatales', credits: 3 },
    { name: 'Proceso Ejecutivo y Declarativo', credits: 3 },
    { name: 'Argumentación en Procesos Penales', credits: 3 },
    { name: 'CBU VII', credits: 2 }
  ]},
  { name: '8° semestre', credits: 18, subjects: [
    { name: 'Acciones Públicas', credits: 3 },
    { name: 'Títulos Valores', credits: 3 },
    { name: 'Derecho Comparado', credits: 3 },
    { name: 'Ética Profesional', credits: 3 },
    { name: 'Derecho Internacional Privado', credits: 3 },
    { name: 'Materia Facultativa', credits: 3 }
  ]},
  { name: '9° semestre', credits: 19, subjects: [
    { name: 'Opciones de Grado', credits: 3 },
    { name: 'Consultorio Jurídico I', credits: 4 },
    { name: 'Materia Facultativa 1', credits: 3 },
    { name: 'Materia Facultativa 2', credits: 3 },
    { name: 'Materia Facultativa 3', credits: 3 },
    { name: 'Materia Facultativa 4', credits: 3 },
    { name: 'Requisito segunda lengua', credits: 0 }
  ]},
  { name: '10° semestre', credits: 19, subjects: [
    { name: 'Consultorio Jurídico II', credits: 4 },
    { name: 'Materia Facultativa 5', credits: 3 },
    { name: 'Curso Libre Elección 1', credits: 3 },
    { name: 'Curso Libre Elección 2', credits: 3 },
    { name: 'Curso Libre Elección 3', credits: 3 },
    { name: 'Curso Libre Elección 4', credits: 3 },
    { name: 'Examen de Facultad', credits: 0 }
  ]}
]

export default function MallaInteractiva() {
  const [approved, setApproved] = useState({})
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem('malla-aprobadas')
    if (saved) setApproved(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('malla-aprobadas', JSON.stringify(approved))
  }, [approved])

  const toggle = (sub) => {
    setApproved(prev => ({ ...prev, [sub.name]: !prev[sub.name] }))
  }

  const totalApprovedCredits = semesters.reduce((sum, sem) => {
    const semSum = sem.subjects.reduce((acc, s) => approved[s.name] ? acc + s.credits : acc, 0)
    return sum + semSum
  }, 0)

  const progress = Math.min((totalApprovedCredits / TOTAL_CREDITS) * 100, 100)

  const resetAll = () => setApproved({})

  const isSemesterComplete = (sem) => sem.subjects.every(s => approved[s.name] || s.credits === 0)

  const getSemesterApprovedCredits = (sem) => sem.subjects.reduce((acc, s) => approved[s.name] ? acc + s.credits : acc, 0)

  const applyFilter = (subject) => {
    if (filter === 'approved') return approved[subject.name]
    if (filter === 'pending') return !approved[subject.name]
    return true
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='p-4 rounded-2xl shadow-lg border' style={{ backgroundColor: '#f3e8ff', borderColor: '#c084fc' }}>
        <h1 className='text-2xl font-bold'>Malla interactiva – Derecho</h1>
        <p className='mt-1'>Créditos aprobados: <strong>{totalApprovedCredits}</strong> / {TOTAL_CREDITS}</p>

        <div className='w-full h-4 bg-white rounded-full mt-3 overflow-hidden border border-purple-300'>
          <div className='h-4 rounded-full' style={{ width: `${progress}%`, backgroundColor: '#c084fc' }} />
        </div>

        <div className='flex flex-wrap gap-2 mt-4'>
          <button onClick={() => setFilter('all')} className='px-3 py-1 rounded-full border'>Todas</button>
          <button onClick={() => setFilter('approved')} className='px-3 py-1 rounded-full border'>Aprobadas</button>
          <button onClick={() => setFilter('pending')} className='px-3 py-1 rounded-full border'>Pendientes</button>
          <button onClick={resetAll} className='px-3 py-1 rounded-full border text-red-600'>Reiniciar</button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {semesters.map((s, i) => {
          const approvedCredits = getSemesterApprovedCredits(s)
          const completed = isSemesterComplete(s)

          return (
            <Card
              key={i}
              className='rounded-2xl shadow-md border'
              style={{ borderColor: completed ? '#7c3aed' : '#c084fc', backgroundColor: completed ? '#ede9fe' : 'white' }}
            >
              <CardContent className='p-4 space-y-2'>
                <h2 className='text-xl font-bold text-purple-700 flex justify-between items-center'>
                  <span>{s.name}</span>
                  {completed && <span className='text-sm font-semibold'>COMPLETO</span>}
                </h2>

                <p>Créditos: {approvedCredits} / {s.credits}</p>

                <div className='space-y-1'>
                  {s.subjects.filter(applyFilter).map((sub, j) => (
                    <label
                      key={j}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg border cursor-pointer ${approved[sub.name] ? 'bg-purple-100' : ''}`}
                    >
                      <input
                        type='checkbox'
                        checked={!!approved[sub.name]}
                        onChange={() => toggle(sub)}
                      />
                      <span>{sub.name} ({sub.credits})</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
// Interactive curriculum grid with credit tracking, progress bar and lilac theme
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const TOTAL_CREDITS = 180

const semesters = [
  { name: '1° semestre', credits: 17, subjects: [
    { name: 'Lógica y Retórica', credits: 3 },
    { name: 'Teoría General del Estado', credits: 3 },
    { name: 'Introducción al Derecho', credits: 4 },
    { name: 'Matemáticas', credits: 3 },
    { name: 'Escritura Universitaria I', credits: 2 },
    { name: 'CBU I', credits: 2 }
  ]},
  { name: '2° semestre', credits: 18, subjects: [
    { name: 'Hermenéutica Jurídica', credits: 3 },
    { name: 'Derecho Romano', credits: 3 },
    { name: 'Sociología Jurídica', credits: 3 },
    { name: 'Historia de las Instituciones Jurídicas', credits: 3 },
    { name: 'Escritura Universitaria II', credits: 2 },
    { name: 'CBU II', credits: 2 },
    { name: 'CBU III', credits: 2 }
  ]},
  { name: '3° semestre', credits: 18, subjects: [
    { name: 'Juez e Interpretación Constitucional', credits: 3 },
    { name: 'Obligaciones I', credits: 5 },
    { name: 'Derecho Constitucional', credits: 5 },
    { name: 'Propiedad y Derechos Reales', credits: 3 },
    { name: 'CBU IV', credits: 2 },
    { name: 'Examen de Ciclo I', credits: 0 }
  ]},
  { name: '4° semestre', credits: 18, subjects: [
    { name: 'Teoría Jurídica', credits: 5 },
    { name: 'Obligaciones II', credits: 5 },
    { name: 'Legislación y Políticas Públicas', credits: 3 },
    { name: 'Derecho Internacional', credits: 3 },
    { name: 'CBU V', credits: 2 }
  ]},
  { name: '5° semestre', credits: 18, subjects: [
    { name: 'Procedimientos', credits: 4 },
    { name: 'Relaciones Laborales', credits: 3 },
    { name: 'Derecho Comercial', credits: 3 },
    { name: 'Derecho Penal', credits: 3 },
    { name: 'Derecho Público Administrativo', credits: 3 },
    { name: 'CBU VI', credits: 2 },
    { name: 'Requisito de lectura en inglés', credits: 0 }
  ]},
  { name: '6° semestre', credits: 17, subjects: [
    { name: 'Protección Laboral', credits: 3 },
    { name: 'Pruebas', credits: 3 },
    { name: 'Contratos', credits: 5 },
    { name: 'Penal Especial', credits: 3 },
    { name: 'Argumentación en Procesos Civiles', credits: 3 }
  ]},
  { name: '7° semestre', credits: 18, subjects: [
    { name: 'Relaciones Familiares', credits: 4 },
    { name: 'Sociedades', credits: 3 },
    { name: 'Contratos Estatales', credits: 3 },
    { name: 'Proceso Ejecutivo y Declarativo', credits: 3 },
    { name: 'Argumentación en Procesos Penales', credits: 3 },
    { name: 'CBU VII', credits: 2 }
  ]},
  { name: '8° semestre', credits: 18, subjects: [
    { name: 'Acciones Públicas', credits: 3 },
    { name: 'Títulos Valores', credits: 3 },
    { name: 'Derecho Comparado', credits: 3 },
    { name: 'Ética Profesional', credits: 3 },
    { name: 'Derecho Internacional Privado', credits: 3 },
    { name: 'Materia Facultativa', credits: 3 }
  ]},
  { name: '9° semestre', credits: 19, subjects: [
    { name: 'Opciones de Grado', credits: 3 },
    { name: 'Consultorio Jurídico I', credits: 4 },
    { name: 'Materia Facultativa 1', credits: 3 },
    { name: 'Materia Facultativa 2', credits: 3 },
    { name: 'Materia Facultativa 3', credits: 3 },
    { name: 'Materia Facultativa 4', credits: 3 },
    { name: 'Requisito segunda lengua', credits: 0 }
  ]},
  { name: '10° semestre', credits: 19, subjects: [
    { name: 'Consultorio Jurídico II', credits: 4 },
    { name: 'Materia Facultativa 5', credits: 3 },
    { name: 'Curso Libre Elección 1', credits: 3 },
    { name: 'Curso Libre Elección 2', credits: 3 },
    { name: 'Curso Libre Elección 3', credits: 3 },
    { name: 'Curso Libre Elección 4', credits: 3 },
    { name: 'Examen de Facultad', credits: 0 }
  ]}
]

export default function MallaInteractiva() {
  const [approved, setApproved] = useState({})
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem('malla-aprobadas')
    if (saved) setApproved(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('malla-aprobadas', JSON.stringify(approved))
  }, [approved])

  const toggle = (sub) => {
    setApproved(prev => ({ ...prev, [sub.name]: !prev[sub.name] }))
  }

  const totalApprovedCredits = semesters.reduce((sum, sem) => {
    const semSum = sem.subjects.reduce((acc, s) => approved[s.name] ? acc + s.credits : acc, 0)
    return sum + semSum
  }, 0)

  const progress = Math.min((totalApprovedCredits / TOTAL_CREDITS) * 100, 100)

  const resetAll = () => setApproved({})

  const isSemesterComplete = (sem) => sem.subjects.every(s => approved[s.name] || s.credits === 0)

  const getSemesterApprovedCredits = (sem) => sem.subjects.reduce((acc, s) => approved[s.name] ? acc + s.credits : acc, 0)

  const applyFilter = (subject) => {
    if (filter === 'approved') return approved[subject.name]
    if (filter === 'pending') return !approved[subject.name]
    return true
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='p-4 rounded-2xl shadow-lg border' style={{ backgroundColor: '#f3e8ff', borderColor: '#c084fc' }}>
        <h1 className='text-2xl font-bold'>Malla interactiva – Derecho</h1>
        <p className='mt-1'>Créditos aprobados: <strong>{totalApprovedCredits}</strong> / {TOTAL_CREDITS}</p>

        <div className='w-full h-4 bg-white rounded-full mt-3 overflow-hidden border border-purple-300'>
          <div className='h-4 rounded-full' style={{ width: `${progress}%`, backgroundColor: '#c084fc' }} />
        </div>

        <div className='flex flex-wrap gap-2 mt-4'>
          <button onClick={() => setFilter('all')} className='px-3 py-1 rounded-full border'>Todas</button>
          <button onClick={() => setFilter('approved')} className='px-3 py-1 rounded-full border'>Aprobadas</button>
          <button onClick={() => setFilter('pending')} className='px-3 py-1 rounded-full border'>Pendientes</button>
          <button onClick={resetAll} className='px-3 py-1 rounded-full border text-red-600'>Reiniciar</button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {semesters.map((s, i) => {
          const approvedCredits = getSemesterApprovedCredits(s)
          const completed = isSemesterComplete(s)

          return (
            <Card
              key={i}
              className='rounded-2xl shadow-md border'
              style={{ borderColor: completed ? '#7c3aed' : '#c084fc', backgroundColor: completed ? '#ede9fe' : 'white' }}
            >
              <CardContent className='p-4 space-y-2'>
                <h2 className='text-xl font-bold text-purple-700 flex justify-between items-center'>
                  <span>{s.name}</span>
                  {completed && <span className='text-sm font-semibold'>COMPLETO</span>}
                </h2>

                <p>Créditos: {approvedCredits} / {s.credits}</p>

                <div className='space-y-1'>
                  {s.subjects.filter(applyFilter).map((sub, j) => (
                    <label
                      key={j}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg border cursor-pointer ${approved[sub.name] ? 'bg-purple-100' : ''}`}
                    >
                      <input
                        type='checkbox'
                        checked={!!approved[sub.name]}
                        onChange={() => toggle(sub)}
                      />
                      <span>{sub.name} ({sub.credits})</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
