import Header from "../../components/Header"
import Footer from "../../components/Footer"
import RelevantPosts from "../../components/RelevantPosts"

export default function Homepage() {
  return (
    <>
      <Header />
      <RelevantPosts />
      <Footer target={0} />
    </>
  )
}
