import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const VirtualList = ({ books, renderItem }) => {
  const parentRef = useRef(null)
  const count = books.length
  /* istanbul ignore next */
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <Stack
      ref={parentRef}
      className='List'
      height={`calc(${window.innerHeight - 60 - 80}px)`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: ' center',
        width: '100%',
        overflowY: 'auto',
        contain: 'strict',
      }}
    >
      <Stack
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <Stack
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => (
            <Stack
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {renderItem(books[virtualRow.index])}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

VirtualList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
}
