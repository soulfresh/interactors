import { Table } from './table';
import { render } from '../test-utils';

describe('table', function() {
  let page, el;

  afterEach(() => {
    if (el) el.remove();
  });

  describe('with an aria-label', () => {
    beforeEach(() => {
      page = Table();
      el = render(`
        <table aria-label="Table Label">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Venues</th>
              <th>Event Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lusine</td>
              <td>The Fillmore</td>
              <td>January</td>
            </tr>
            <tr>
              <td>Lusine</td>
              <td>The Fillmore</td>
              <td>January</td>
            </tr>
            <tr>
              <td>Lusine</td>
              <td>The Fillmore</td>
              <td>January</td>
            </tr>
          </tbody>
        </table>
      `);
    });

    it('should render the table', async () => {
      await page.exists();
      await Table('Table Label').exists();
    });

    it('should render the table data.', async () => {
      await page.has({columnCount: 3});
      await page.has({rowCount: 4});
      await page.has({dataCount: 3});

      await page.has({cellValues: [
        ['Artist' , 'Venues'       , 'Event Date'] ,
        ['Lusine' , 'The Fillmore' , 'January']    ,
        ['Lusine' , 'The Fillmore' , 'January']    ,
        ['Lusine' , 'The Fillmore' , 'January']    ,
      ]})
    });
  });

  describe('with an aria-labelledby', () => {
    beforeEach(() => {
      page = Table();
      el = render(`
        <div>
          <h1 id="heading">Table Title</h1>
          <table aria-labelledby="heading">
            <tbody>
              <tr>
                <td>Lusine</td>
                <td>The Fillmore</td>
                <td>January</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    });

    it('should render the table', async () => {
      await Table('Table Title').exists();
    });

    it('should render the table data.', async () => {
      await page.has({columnCount: 3});
      await page.has({rowCount: 1});
      await page.has({dataCount: 1});

      await page.has({cellValues: [
        ['Lusine', 'The Fillmore', 'January'],
      ]})
    });
  });
});
