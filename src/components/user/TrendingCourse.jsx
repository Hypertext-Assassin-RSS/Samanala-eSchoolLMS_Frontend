import React from 'react'
import SectionTitle from './SectionTitle'
import HorizontalRule from '../common/HorizontalRule'
import CourseCard from './CourseCard'

function TrendingCourse() {
  return (
    <>
    <SectionTitle title='Treding Course' description='View the trending courses in Samanala eSchool' />
    <HorizontalRule />

    <CourseCard />
    </>
  )
}

export default TrendingCourse