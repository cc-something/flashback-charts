import type { Song } from '@/types/song'
import songs1940, { source as source1940 } from './years/1940'
import songs1941, { source as source1941 } from './years/1941'
import songs1942, { source as source1942 } from './years/1942'
import songs1943, { source as source1943 } from './years/1943'
import songs1944, { source as source1944 } from './years/1944'
import songs1945, { source as source1945 } from './years/1945'
import songs1946, { source as source1946 } from './years/1946'
import songs1947, { source as source1947 } from './years/1947'
import songs1948, { source as source1948 } from './years/1948'
import songs1949, { source as source1949 } from './years/1949'
import songs1950, { source as source1950 } from './years/1950'
import songs1951, { source as source1951 } from './years/1951'
import songs1952, { source as source1952 } from './years/1952'
import songs1953, { source as source1953 } from './years/1953'
import songs1954, { source as source1954 } from './years/1954'
import songs1955, { source as source1955 } from './years/1955'
import songs1956, { source as source1956 } from './years/1956'
import songs1957, { source as source1957 } from './years/1957'
import songs1958, { source as source1958 } from './years/1958'
import songs1959, { source as source1959 } from './years/1959'
import songs1960, { source as source1960 } from './years/1960'
import songs1961, { source as source1961 } from './years/1961'
import songs1962, { source as source1962 } from './years/1962'
import songs1963, { source as source1963 } from './years/1963'
import songs1964, { source as source1964 } from './years/1964'
import songs1965, { source as source1965 } from './years/1965'
import songs1966, { source as source1966 } from './years/1966'
import songs1967, { source as source1967 } from './years/1967'
import songs1968, { source as source1968 } from './years/1968'
import songs1969, { source as source1969 } from './years/1969'
import songs1970, { source as source1970 } from './years/1970'
import songs1971, { source as source1971 } from './years/1971'
import songs1972, { source as source1972 } from './years/1972'
import songs1973, { source as source1973 } from './years/1973'
import songs1974, { source as source1974 } from './years/1974'
import songs1975, { source as source1975 } from './years/1975'
import songs1976, { source as source1976 } from './years/1976'
import songs1977, { source as source1977 } from './years/1977'
import songs1978, { source as source1978 } from './years/1978'
import songs1979, { source as source1979 } from './years/1979'
import songs1980, { source as source1980 } from './years/1980'
import songs1981, { source as source1981 } from './years/1981'
import songs1982, { source as source1982 } from './years/1982'
import songs1983, { source as source1983 } from './years/1983'
import songs1984, { source as source1984 } from './years/1984'
import songs1985, { source as source1985 } from './years/1985'
import songs1986, { source as source1986 } from './years/1986'
import songs1987, { source as source1987 } from './years/1987'
import songs1988, { source as source1988 } from './years/1988'
import songs1989, { source as source1989 } from './years/1989'
import songs1990, { source as source1990 } from './years/1990'
import songs1991, { source as source1991 } from './years/1991'
import songs1992, { source as source1992 } from './years/1992'
import songs1993, { source as source1993 } from './years/1993'
import songs1994, { source as source1994 } from './years/1994'
import songs1995, { source as source1995 } from './years/1995'
import songs1996, { source as source1996 } from './years/1996'
import songs1997, { source as source1997 } from './years/1997'
import songs1998, { source as source1998 } from './years/1998'
import songs1999, { source as source1999 } from './years/1999'
import songs2000, { source as source2000 } from './years/2000'
import songs2001, { source as source2001 } from './years/2001'
import songs2002, { source as source2002 } from './years/2002'
import songs2003, { source as source2003 } from './years/2003'
import songs2004, { source as source2004 } from './years/2004'
import songs2005, { source as source2005 } from './years/2005'
import songs2006, { source as source2006 } from './years/2006'
import songs2007, { source as source2007 } from './years/2007'
import songs2008, { source as source2008 } from './years/2008'
import songs2009, { source as source2009 } from './years/2009'
import songs2010, { source as source2010 } from './years/2010'
import songs2011, { source as source2011 } from './years/2011'
import songs2012, { source as source2012 } from './years/2012'
import songs2013, { source as source2013 } from './years/2013'
import songs2014, { source as source2014 } from './years/2014'
import songs2015, { source as source2015 } from './years/2015'
import songs2016, { source as source2016 } from './years/2016'
import songs2017, { source as source2017 } from './years/2017'
import songs2018, { source as source2018 } from './years/2018'
import songs2019, { source as source2019 } from './years/2019'
import songs2020, { source as source2020 } from './years/2020'
import songs2021, { source as source2021 } from './years/2021'
import songs2022, { source as source2022 } from './years/2022'
import songs2023, { source as source2023 } from './years/2023'
import songs2024, { source as source2024 } from './years/2024'
import songs2025, { source as source2025 } from './years/2025'

export interface YearSource {
  label: string
  url: string
}

interface YearChartData {
  songs: Song[]
  source: YearSource | null
}

const yearData: Record<number, YearChartData> = {
  1940: {
    songs: songs1940,
    source: source1940,
  },
  1941: {
    songs: songs1941,
    source: source1941,
  },
  1942: {
    songs: songs1942,
    source: source1942,
  },
  1943: {
    songs: songs1943,
    source: source1943,
  },
  1944: {
    songs: songs1944,
    source: source1944,
  },
  1945: {
    songs: songs1945,
    source: source1945,
  },
  1946: {
    songs: songs1946,
    source: source1946,
  },
  1947: {
    songs: songs1947,
    source: source1947,
  },
  1948: {
    songs: songs1948,
    source: source1948,
  },
  1949: {
    songs: songs1949,
    source: source1949,
  },
  1950: {
    songs: songs1950,
    source: source1950,
  },
  1951: {
    songs: songs1951,
    source: source1951,
  },
  1952: {
    songs: songs1952,
    source: source1952,
  },
  1953: {
    songs: songs1953,
    source: source1953,
  },
  1954: {
    songs: songs1954,
    source: source1954,
  },
  1955: {
    songs: songs1955,
    source: source1955,
  },
  1956: {
    songs: songs1956,
    source: source1956,
  },
  1957: {
    songs: songs1957,
    source: source1957,
  },
  1958: {
    songs: songs1958,
    source: source1958,
  },
  1959: {
    songs: songs1959,
    source: source1959,
  },
  1960: {
    songs: songs1960,
    source: source1960,
  },
  1961: {
    songs: songs1961,
    source: source1961,
  },
  1962: {
    songs: songs1962,
    source: source1962,
  },
  1963: {
    songs: songs1963,
    source: source1963,
  },
  1964: {
    songs: songs1964,
    source: source1964,
  },
  1965: {
    songs: songs1965,
    source: source1965,
  },
  1966: {
    songs: songs1966,
    source: source1966,
  },
  1967: {
    songs: songs1967,
    source: source1967,
  },
  1968: {
    songs: songs1968,
    source: source1968,
  },
  1969: {
    songs: songs1969,
    source: source1969,
  },
  1970: {
    songs: songs1970,
    source: source1970,
  },
  1971: {
    songs: songs1971,
    source: source1971,
  },
  1972: {
    songs: songs1972,
    source: source1972,
  },
  1973: {
    songs: songs1973,
    source: source1973,
  },
  1974: {
    songs: songs1974,
    source: source1974,
  },
  1975: {
    songs: songs1975,
    source: source1975,
  },
  1976: {
    songs: songs1976,
    source: source1976,
  },
  1977: {
    songs: songs1977,
    source: source1977,
  },
  1978: {
    songs: songs1978,
    source: source1978,
  },
  1979: {
    songs: songs1979,
    source: source1979,
  },
  1980: {
    songs: songs1980,
    source: source1980,
  },
  1981: {
    songs: songs1981,
    source: source1981,
  },
  1982: {
    songs: songs1982,
    source: source1982,
  },
  1983: {
    songs: songs1983,
    source: source1983,
  },
  1984: {
    songs: songs1984,
    source: source1984,
  },
  1985: {
    songs: songs1985,
    source: source1985,
  },
  1986: {
    songs: songs1986,
    source: source1986,
  },
  1987: {
    songs: songs1987,
    source: source1987,
  },
  1988: {
    songs: songs1988,
    source: source1988,
  },
  1989: {
    songs: songs1989,
    source: source1989,
  },
  1990: {
    songs: songs1990,
    source: source1990,
  },
  1991: {
    songs: songs1991,
    source: source1991,
  },
  1992: {
    songs: songs1992,
    source: source1992,
  },
  1993: {
    songs: songs1993,
    source: source1993,
  },
  1994: {
    songs: songs1994,
    source: source1994,
  },
  1995: {
    songs: songs1995,
    source: source1995,
  },
  1996: {
    songs: songs1996,
    source: source1996,
  },
  1997: {
    songs: songs1997,
    source: source1997,
  },
  1998: {
    songs: songs1998,
    source: source1998,
  },
  1999: {
    songs: songs1999,
    source: source1999,
  },
  2000: {
    songs: songs2000,
    source: source2000,
  },
  2001: {
    songs: songs2001,
    source: source2001,
  },
  2002: {
    songs: songs2002,
    source: source2002,
  },
  2003: {
    songs: songs2003,
    source: source2003,
  },
  2004: {
    songs: songs2004,
    source: source2004,
  },
  2005: {
    songs: songs2005,
    source: source2005,
  },
  2006: {
    songs: songs2006,
    source: source2006,
  },
  2007: {
    songs: songs2007,
    source: source2007,
  },
  2008: {
    songs: songs2008,
    source: source2008,
  },
  2009: {
    songs: songs2009,
    source: source2009,
  },
  2010: {
    songs: songs2010,
    source: source2010,
  },
  2011: {
    songs: songs2011,
    source: source2011,
  },
  2012: {
    songs: songs2012,
    source: source2012,
  },
  2013: {
    songs: songs2013,
    source: source2013,
  },
  2014: {
    songs: songs2014,
    source: source2014,
  },
  2015: {
    songs: songs2015,
    source: source2015,
  },
  2016: {
    songs: songs2016,
    source: source2016,
  },
  2017: {
    songs: songs2017,
    source: source2017,
  },
  2018: {
    songs: songs2018,
    source: source2018,
  },
  2019: {
    songs: songs2019,
    source: source2019,
  },
  2020: {
    songs: songs2020,
    source: source2020,
  },
  2021: {
    songs: songs2021,
    source: source2021,
  },
  2022: {
    songs: songs2022,
    source: source2022,
  },
  2023: {
    songs: songs2023,
    source: source2023,
  },
  2024: {
    songs: songs2024,
    source: source2024,
  },
  2025: {
    songs: songs2025,
    source: source2025,
  },
}

export const getYearData = (year: number): Song[] | undefined =>
  yearData[year]?.songs

export const getYearSource = (year: number): YearSource | null =>
  yearData[year]?.source ?? null

export const getAvailableYears = (): number[] =>
  Object.keys(yearData).map(Number)

export const searchSongs = (query: string): { song: Song; year: number }[] => {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const results: { song: Song; year: number }[] = []
  for (const [yearStr, data] of Object.entries(yearData)) {
    const year = Number(yearStr)
    for (const song of data.songs) {
      if (
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.album?.toLowerCase().includes(q)
      )
        results.push({ song, year })
    }
  }
  return results
}
