import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Buat fungsi getStaticProps yang mengembalikan data sebagai props
const App = () => {

  return (
    <Table className="w-full h-auto fixed mt-36">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-60">Name</TableHead>
          <TableHead className="w-60">Price</TableHead>
          <TableHead>Volume (24h)</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead className="text-right">Supply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-auto">
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
      </TableBody>
    </Table>
  )
}

export default App