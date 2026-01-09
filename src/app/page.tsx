import Header from './_components/Header'


import Faq from './_components/FAQ'

import NewsSection from './_components/News'
import VideoProfil from './_components/VideoProfil'
import WhyUs from './_components/WhyUs'
import VisiMisi from './_components/VisiMisi'
import AspirasiPage from './_components/AspirasiForm'
import JurusanSection from './_components/Jurusan'
import Berita from './_components/Berita'
import Statistic from './_components/Statistic'
import AlurPendaftaran from './_components/AlurPendaftaran'
import Sambutan from './_components/Smbutan'
import Partner from './_components/Partner'


export default function Home () {
  return (
    <>
      <Header />
      <VisiMisi />
      <Berita />
      <Sambutan />
      <WhyUs />
      <Statistic />
      <JurusanSection />
      <VideoProfil />
      <AlurPendaftaran />
      <Faq />
      <AspirasiPage />
      <Partner />
    </>
  )
}
