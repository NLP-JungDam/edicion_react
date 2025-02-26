import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './JobList.module.css'
import JobDetail from './JobDetail'
import Modal from './Modal'

const JobList = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(null)
  const [jobs, setJobs] = useState([])
  const [displayedJobs, setDisplayedJobs] = useState([])
  const [selectedJobIndex, setSelectedJobIndex] = useState(null)
  const [selectedJobs, setSelectedJobs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    const url = `http://localhost:8080/job/${userId}`

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('서버 통신 에러')
        }
        return res.json()
      })
      .then(data => {
        setJobs(data)
        setDisplayedJobs(data.slice(0, 6))
      })
      .catch(err => console.error('채용 공고 불러오기 실패:', err))
  }, [userId])

  const loadMoreJobs = () => {
    const newVisibleCount = visibleCount + 6
    setDisplayedJobs(jobs.slice(0, newVisibleCount))
    setVisibleCount(newVisibleCount)
  }

  const toggleJobDetail = index => {
    setSelectedJobIndex(selectedJobIndex === index ? null : index)
  }

  const handleCheckboxChange = jobId => {
    setSelectedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    )
  }

  const handleSubmit = async () => {
    if (selectedJobs.length === 0) {
      alert('지원할 일자리를 선택하세요.')
      return
    }
    try {
      const userResponse = await fetch(`http://localhost:8080/job/info/${userId}`)
      if (!userResponse) {
        console.error('lorem 불러오기 실패')
        return
      }
      const userInfo = await userResponse.json()
      const { lorem } = userInfo
      const jobPreferredMap = {}
      selectedJobs.forEach(jobId => {
        const job = jobs.find(job => job._id === jobId)
        if (job) {
          jobPreferredMap[jobId] = job.preferred || null
        }
      })

      const fastApiRequestBody = {
        lorem,
        jobs: jobPreferredMap
      }
      setLoading(true)
      const similarityResponse = await fetch('http://127.0.0.1:5500/employer/similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fastApiRequestBody)
      })
      if (!similarityResponse.ok) {
        console.error('FastAPI 호출 실패')
        setLoading(false)
        return
      }
      const similarityData = await similarityResponse.json()
      const applicantsData = Object.keys(similarityData.fitness).map(jobId => ({
        jobId,
        applicants: { userId, fitness: similarityData.fitness[jobId] }
      }))

      const applyResponse = await fetch('http://localhost:8080/job/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          applicantsData
        })
      })
      if (!applyResponse.ok) {
        console.error('이력서 제출 실패')
        return
      }
      setLoading(false)
      setIsModalOpen(true)
    } catch (error) {
      console.error('이력서 제출 중 오류 발생', error)
    }
  }

  return (
    <div className={styles.jobList}>
      <ul>
        {displayedJobs.map((job, index) => (
          <li key={job._id} className={styles.jobItem}>
            <div className={styles.jobHeader}>
              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job._id)}
                  onChange={() => handleCheckboxChange(job._id)}
                />
                <span className={styles.customCheckbox}></span>
              </label>
              <div className={styles.jobInfo}>
                <div className={styles.jobTitle}>{job.title}</div>
                <div className={styles.businessName}>{job.businessName}</div>
                <div className={styles.jobMeta}>
                  <span className={styles.location}>{job.location || "위치 정보 없음"}</span>
                  <span className={styles.payment}>{job.payment ? job.payment : "협의 가능"}</span>
                </div>
              </div>
              <button className={styles.toggleButton} onClick={() => toggleJobDetail(index)}>
                {selectedJobIndex === index ? '▲' : '▼'}
              </button>
            </div>
            {selectedJobIndex === index && <JobDetail job={job} />}
          </li>
        ))}
      </ul>
      {visibleCount < jobs.length && (
        <button className={styles.loadMoreButton} onClick={loadMoreJobs}>
          더보기
        </button>
      )}
      <button className={styles.submitButton} onClick={handleSubmit}>
        이력서 제출하기
      </button>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>이력서 제출 중입니다! 잠시만 기다려 주세요.</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="이력서가 제출되었어요!"
        buttonText="제출 내역 보러 가기"
        onConfirm={() => navigate('/user/info')}
      />
    </div>
  )
}

export default JobList
